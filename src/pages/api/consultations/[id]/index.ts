import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { consultationValidationSchema } from 'validationSchema/consultations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.consultation
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getConsultationById();
    case 'PUT':
      return updateConsultationById();
    case 'DELETE':
      return deleteConsultationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getConsultationById() {
    const data = await prisma.consultation.findFirst(convertQueryToPrismaUtil(req.query, 'consultation'));
    return res.status(200).json(data);
  }

  async function updateConsultationById() {
    await consultationValidationSchema.validate(req.body);
    const data = await prisma.consultation.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteConsultationById() {
    const data = await prisma.consultation.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
