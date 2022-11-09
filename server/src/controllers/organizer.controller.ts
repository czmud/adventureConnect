import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { env } from '../util/environment';
import { Organizer } from '../models/organizer.model';

export const findAllOrganizers = (req: Request, res: Response) => {
	Organizer.find()
		.then((allOrganizers) => res.json({ organizers: allOrganizers }))
		.catch((err) => res.json({ message: 'Something went wrong', error: err }));
};

export const getLoggedInOrganizer = (req: Request, res: Response) => {
	const decodedJWT: JwtPayload | null = jwt.decode(req.cookies.organizerToken, {
		complete: true,
	});
	const _id = decodedJWT?.payload.id;
	Organizer.findOne({ _id })
		.then((oneOrganizer) => res.json({ organizer: oneOrganizer }))
		.catch((err) => res.json({ message: 'Something went wrong', error: err }));
};

export const createNewOrganizer = (req: Request, res: Response) => {
	console.log(`created ${JSON.stringify(req.body)}`);
	Organizer.create(req.body)
		.then((newlyCreatedOrganizer) => {
			const organizerToken = jwt.sign(
				{
					id: newlyCreatedOrganizer._id,
				},
				env.SECRET_KEY,
			);

			res.cookie('organizerToken', organizerToken, { httpOnly: true }).json({
				msg: 'success!',
			});
		})
		.catch((err) => res.status(400).json(err));
};

export const updateOrganizer = (req: Request, res: Response) => {
	console.log(`updated ${JSON.stringify(req.body)}`);
	Organizer.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
		.then((updatedOrganizer) => res.json({ organizer: updatedOrganizer }))
		.catch((err) => res.status(400).json(err));
};

export const deleteOrganizer = (req: Request, res: Response) => {
	console.log(`deleted id: ${req.params.id}`);
	Organizer.deleteOne({ _id: req.params.id })
		.then((result) => res.json({ result }))
		.catch((err) => res.json({ message: 'something went wrong', error: err }));
};

export const logOrganizerIn = async (req: Request, res: Response) => {
	const organizer = await Organizer.findOne({ email: req.body.email });

	if (organizer === null) {
		return res.status(400).json({
			errors: {
				email: {
					path: 'email',
					message: 'Account for this email does not exist',
				},
			},
		});
	}

	const passwordIsCorrect: boolean = await bcrypt.compare(
		req.body.password,
		organizer.passwordHash,
	);

	if (!passwordIsCorrect) {
		return res.status(400).json({
			errors: {
				password: {
					path: 'password',
					message: 'Incorrect password',
				},
			},
		});
	}

	const organizerToken = jwt.sign(
		{
			id: organizer._id,
		},
		env.SECRET_KEY,
	);

	return res
		.cookie('organizerToken', organizerToken, { httpOnly: true })
		.json({ msg: 'success!' });
};

export const logOrganizerOut = (req: Request, res: Response) => {
	res.clearCookie('organizerToken');
	res.sendStatus(200);
};
