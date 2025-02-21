import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/listar", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ omit: { password: true } });

    res.status(200).json({ message: "Usuários:", users });
  } catch (erro) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});

export default router;
