import kue from 'kue';
import BookingService from '~/services/booking.service';

const queue = kue.createQueue();
const REVOKE = 'revoke';

queue.process(REVOKE, 1, (job, done) => {
  const {ticketId} = job.data;
  BookingService.revoke(ticketId).then(res => {
    console.log(`remove reservation ${JSON.stringify(job.data)} result: `, res);
    done();
  });
});

queue.on('job complete', (id, result) => {
  kue.Job.get(id, (err, job) => {
    if (err) return;

    console.log('job completed with result: ', result);
    job.remove(err => {
      if (err) throw err;
      console.log(`removed completed job #${job.id}`);
    });
  });
});

const reservationRevoke = (ticketId, timeout) => {
  return new Promise(resolve => {
    const job = queue
      .create(REVOKE, {
        title: 'Trying to revoke user reservation',
        ticketId
      })
      .delay(timeout)
      .save(error => {
        if (error) return null;
        resolve(job.id);
      });
  });
};

const cancelJob = jobId => kue.Job.remove(jobId);

export {cancelJob, reservationRevoke};
export default queue;
