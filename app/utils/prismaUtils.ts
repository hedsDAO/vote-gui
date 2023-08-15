import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function getTapeByProposalId(proposalId: string) {
    try {
    const tapeData = await prisma.tapes.findUnique({
      where: {
        proposal_id: proposalId,
      }
    });
    await prisma.$disconnect();
    return tapeData;
    } catch(e) {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    }
  }