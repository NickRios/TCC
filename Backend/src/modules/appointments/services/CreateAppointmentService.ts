import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe'

import Appointment from '../model/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}


    public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked')
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        })


        return appointment;
    }
}

export default CreateAppointmentService;