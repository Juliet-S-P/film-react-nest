import { AppDataSource } from '../data-source';
import { ScheduleEntity } from '../entities/schedule.entity';


export async function schedulesSeed() {

  const repo = AppDataSource.getRepository(ScheduleEntity);


  const schedules: ScheduleEntity[] = [

    {
      id: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
      daytime: '2024-06-28T10:00:53+03:00',
      filmId: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      hall: 0,
      price: 350,
      rows: 5,
      seats: 10,
      taken: []
    },

    {
      id: '5beec101-acbb-4158-adc6-d855716b44a8',
      daytime: '2024-06-28T14:00:53+03:00',
      filmId: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      hall: 1,
      price: 350,
      rows: 5,
      seats: 10,
      taken: []
    },


    {
      id:'793009d6-030c-4dd4-8d13-9ba500724b38',
      daytime:'2024-06-28T10:00:53+03:00',
      filmId:'5b70cb1a-61c9-47b1-b207-31f9e89087ff',
      hall:0,
      price:350,
      rows:5,
      seats:10,
      taken:[
        '3:3',
        '1:4',
        '1:5',
        '1:3',
        '1:2'
      ]
    },


    {
      id:'bfd27e0e-3a21-465c-966c-c874da242875',
      daytime:'2024-06-29T11:00:53+03:00',
      filmId:'5b70cb1a-61c9-47b1-b207-31f9e89087ff',
      hall:0,
      price:350,
      rows:5,
      seats:10,
      taken:[
        '2:2',
        '2:3'
      ]
    },


    {
      id:'5274c89d-f39c-40f9-bea8-f22a22a50c8a',
      daytime:'2024-06-28T10:00:53+03:00',
      filmId:'92b8a2a7-ab6b-4fa9-915b-d27945865e39',
      hall:0,
      price:350,
      rows:5,
      seats:10,
      taken:[]
    },


    {
      id:'d3f54ca3-8e19-4b63-afd4-6a8d03933339',
      daytime:'2024-06-28T10:00:53+03:00',
      filmId:'0354a762-8928-427f-81d7-1656f717f39c',
      hall:0,
      price:350,
      rows:5,
      seats:10,
      taken:[]
    },


    {
      id:'351b437c-3430-4a35-b71d-b93b3d80274a',
      daytime:'2024-06-28T10:00:53+03:00',
      filmId:'3bedbc5a-844b-40eb-9d77-83b104e0cf75',
      hall:0,
      price:350,
      rows:5,
      seats:10,
      taken:[]
    }

  ];


  await repo.save(schedules);

}