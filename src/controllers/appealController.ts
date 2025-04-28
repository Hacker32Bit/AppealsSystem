import { Request, Response, NextFunction } from 'express';
import { appeals, Appeal } from '../models/appeal';
import { v4 as uuidv4 } from 'uuid';
import { parseDate } from '../utils/dateParser';

// Create an appeal
export const createAppeal = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, text } = req.body;
        const newAppeal: Appeal = { id: uuidv4(), name, text, status: "New", result: undefined, reason: undefined, created: new Date(), last_hit: new Date() };
        appeals.push(newAppeal);
        res.status(201).json(newAppeal);
    } catch (error) {
        next(error);
    }
};

// Read all appeals(With optional startDate and endDate)
export const getAppeals = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { startDate, endDate } = req.body as { startDate?: string; endDate?: string };
        let result = appeals;

        const parsedStart = parseDate(startDate);
        const parsedEnd = parseDate(endDate);

        if (parsedStart) {
            result = result.filter(i => i.created >= parsedStart);
        }

        if (parsedEnd) {
            result = result.filter(i => i.created <= parsedEnd);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};

// Read single appeal by ID
export const getAppealById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const appeal = appeals.find((i) => i.id === id);
        if (!appeal) {
            res.status(404).json({ message: 'Appeal not found' });
            return;
        }
        res.json(appeal);
    } catch (error) {
        next(error);
    }
};

// Take appeal by ID
export const takeAppeal = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const appeal = appeals.find((i) => i.id === id);
        if (!appeal) {
            res.status(404).json({ message: 'Appeal not found' });
            return;
        }
        appeal.status = "Working"
        appeal.last_hit = new Date()
        res.json(appeal);
    } catch (error) {
        next(error);
    }
};

// Complete appeal by ID
export const completeAppeal = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const { result } = req.body
        const appeal = appeals.find((i) => i.id === id);
        if (!appeal) {
            res.status(404).json({ message: 'Appeal not found' });
            return;
        }
        appeal.status = "Completed"
        appeal.result = result
        appeal.last_hit = new Date()
        res.json(appeal);
    } catch (error) {
        next(error);
    }
};

// Cancel appeal by ID
export const cancelAppeal = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const { reason } = req.body
        const appeal = appeals.find((i) => i.id === id);
        if (!appeal) {
            res.status(404).json({ message: 'Appeal not found' });
            return;
        }
        appeal.status = "Canceled"
        appeal.reason = reason
        appeal.last_hit = new Date()
        res.json(appeal);
    } catch (error) {
        next(error);
    }
};

// Cancel all appeals(Wchich have Working status)
export const cancelAllAppeals = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reason } = req.body
        const appealIndex = appeals.findIndex((i) => i.status == "Working");
        if (appealIndex === -1) {
            res.status(404).json({ message: 'Appeals not found' });
            return;
        }
        appeals[appealIndex].status = "Canceled";
        appeals[appealIndex].reason = reason
        appeals[appealIndex].last_hit = new Date()
        res.json(appeals[appealIndex]);
    } catch (error) {
        next(error);
    }
};

// Delete an appeal by ID
export const deleteAppeal = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const appealIndex = appeals.findIndex((i) => i.id === id);
        if (appealIndex === -1) {
            res.status(404).json({ message: 'Appeal not found' });
            return;
        }
        const deletedAppeal = appeals.splice(appealIndex, 1)[0];
        res.json(deletedAppeal);
    } catch (error) {
        next(error);
    }
};