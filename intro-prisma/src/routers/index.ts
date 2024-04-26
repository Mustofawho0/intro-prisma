import express, { Router } from 'express';
import BranchRouter from './BranchRouter'
const router = Router()
router.use(express.json())

router.use('/branch', BranchRouter)

export default router