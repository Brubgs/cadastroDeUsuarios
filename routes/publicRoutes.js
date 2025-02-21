import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

//cadastro
router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const userDB = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword,
      },
    });

    res.status(201).json({ message: "Cadastro realizado!" });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const userInfo = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: userInfo.email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(userInfo.password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    res.status(200).json({ message: "Usuário encontrado" });
  } catch (err) {
    res.status(500).json({ message: "Erro" });
  }
});

export default router;
