import { Router } from 'express';
import {
  GetAllBranch,
  CreateNewBranch,
  BranchDetail,
  BranchUpdate,
  BranchDelete,
} from '../controllers/BranchControllers';
import { PrismaClient } from '@prisma/client';

const router = Router();
// const prisma = new PrismaClient()

router.get('/', GetAllBranch);
router.post('/new', CreateNewBranch);
router.get('/:id', BranchDetail);
router.post('/:id', BranchUpdate);
router.delete('/:id', BranchDelete);

export default router;
