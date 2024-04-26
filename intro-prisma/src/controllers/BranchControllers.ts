import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET ALL AND SEARCH WITH QUERY
export const GetAllBranch = async (req: Request, res: Response) => {
  try {
    interface FilterQuery {
      id?: number;
      name?: string;
      location?: string;
    }
    const { id, name, location, page } = req.query;
    const filterDataBranch: FilterQuery = {};
    if (id) {
      filterDataBranch.id = Number(id as string);
    }
    if (name) {
      filterDataBranch.name = name as string;
    }
    if (location) {
      filterDataBranch.location = location as string;
    }
    const branches = await prisma.branch.findMany({
      // where : {
      //     ...filterDataBranch,
      //     location:{
      //         startsWith:filterDataBranch.location
      //     }
      // }
      skip: Number(page) > 0 ? (Number(page) - 1) * 5 : 0,
      take: 5,
    });
    return res.status(200).send({
      message: 'success',
      data: branches,
    });
  } catch (error: any) {
    res.send(error.message);
  }
};

// CREATE NEW
export const CreateNewBranch = async (req: Request, res: Response) => {
  try {
    const { name, location } = req.body;
    const branch = await prisma.branch.create({
      data: {
        name,
        location,
      },
    });
    return res.status(201).send({
      message: 'Success',
      data: branch,
    });
  } catch (error: any) {
    res.send(error.message);
  }
};

// DETAIL UNIQUE
export const BranchDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const branchDetail = await prisma.branch.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        manager: true,
      } as never
    });
    if (!branchDetail) throw new Error('Branch Not Found!');

    return res.status(200).send({
      message: 'Success',
      data: branchDetail,
    });
  } catch (error: any) {
    res.send(error.message);
  }
};

// UPDATE BRANCH
export const BranchUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateBranch = await prisma.branch.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    return res.status(201).send({
      message: 'Success',
      data: updateBranch,
    });
  } catch (error: any) {
    res.send(error.message);
  }
};

// DETELE BRANCH
export const BranchDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteBranch = await prisma.branch.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).send({
      message: 'Success',
    });
  } catch (error: any) {
    res.send(error.message);
  }
};
