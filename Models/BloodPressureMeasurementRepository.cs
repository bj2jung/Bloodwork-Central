using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using System.Diagnostics;

namespace react_asp.Models
{

    public class BloodPressureMeasurementRepository : IBloodPressureMeasurementRepository
    {

        private readonly ApplicationDbContext _db;

        public BloodPressureMeasurementRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<PaginatedList<BloodPressureMeasurement>> GetRecordsByPage(int pageIndex, int pageSize)
        {

            var paginator = await PaginatedList<BloodPressureMeasurement>.CreateAsync(_db.BloodPressureMeasurement, pageIndex, pageSize);

            return paginator;
        }

        public async Task<IEnumerable<BloodPressureMeasurement>> GetRecords()
        {
            return await _db.BloodPressureMeasurement.ToListAsync();
        }

        public async Task<BloodPressureMeasurement> GetRecordById(int id)
        {
            return await _db.BloodPressureMeasurement.FirstOrDefaultAsync(r => r.RecordId == id);
        }


        public async Task<BloodPressureMeasurement> AddRecord(BloodPressureMeasurement record)
        {
            var result = await _db.BloodPressureMeasurement.AddAsync(record);
            await _db.SaveChangesAsync();
            return result.Entity;
        }


        public async Task<BloodPressureMeasurement> DeleteRecord(int id)
        {
            var result = await _db.BloodPressureMeasurement.FirstOrDefaultAsync(r => r.RecordId == id);

            if (result != null)
            {
                _db.BloodPressureMeasurement.Remove(result);
                await _db.SaveChangesAsync();
                return result;
            }

            return null;
        }


        public async Task<BloodPressureMeasurement> UpdateRecord(BloodPressureMeasurement record)
        {
            var result = await _db.BloodPressureMeasurement.FirstOrDefaultAsync(r => r.RecordId == record.RecordId);

            if (result != null)
            {
                result.HeartRate = record.HeartRate;
                result.CreatedDate = record.CreatedDate;
                result.ExamDate = record.ExamDate;
                result.Description = record.Description;
                result.SystolicMeasurement = record.SystolicMeasurement;
                result.DiastolicMeasurement = record.DiastolicMeasurement;

                await _db.SaveChangesAsync();

                return result;
            }

            return null;
        }

        public async Task<bool> GenerateRecords(int count)
        {
            string createdDate = DateTime.Today.ToString("yyyy-MM-dd");
            Random random = new Random();

            DateTime earliestExamDate = new DateTime(2010, 1, 1);

            string GenerateRandomExamDate()
            {
                int range = (DateTime.Today - earliestExamDate).Days;

                string randomExamDate = earliestExamDate.AddDays(random.Next(range)).ToString("yyyy-MM-dd");

                // Reset earliestExamDate to original
                earliestExamDate.AddDays(-random.Next(range));

                return randomExamDate;
            }

            int GenerateRandomSystolicMeasurement()
            {
                return random.Next(80, 140);
            }

            int GenerateRandomDiastolicMeasurement()
            {
                return random.Next(50, 110);
            }

            int GenerateRandomHeartRate()
            {
                return random.Next(50, 200);
            }

            BloodPressureMeasurement GenerateRandomRecord()
            {
                BloodPressureMeasurement record = new BloodPressureMeasurement(createdDate, GenerateRandomExamDate(), GenerateRandomSystolicMeasurement(), GenerateRandomDiastolicMeasurement(), GenerateRandomHeartRate(), "Randomly Generated Record");
                return record;
            };


            for (int i = 0; i < count; i++)
            {
                var randomRecord = GenerateRandomRecord();
                _db.BloodPressureMeasurement.Add(randomRecord);
            }

            var result = await _db.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<BloodPressureMeasurement>> GetOutliers(double threshold)
        {

            dynamic GetStdDev(IEnumerable<BloodPressureMeasurement> records, double avgSystolic, double avgDiastolic, int totalRecords)
            {
                double systolicSum = 0;
                double diastolicSum = 0;

                foreach (var record in records)
                {
                    systolicSum += Math.Pow(record.DiastolicMeasurement - avgSystolic, 2);
                    diastolicSum += Math.Pow(record.DiastolicMeasurement - avgDiastolic, 2);
                }

                return new
                {
                    systolicStdev = Math.Sqrt(systolicSum / totalRecords),
                    diastolicStdev = Math.Sqrt(diastolicSum / totalRecords)
                };
            }

            double CalculateZScore(int value, double avg, double stdev)
            {
                return (value - avg) / stdev;
            }

            var avgSystolic = await _db.BloodPressureMeasurement.AverageAsync(record => record.SystolicMeasurement);
            var avgDiastolic = await _db.BloodPressureMeasurement.AverageAsync(record => record.DiastolicMeasurement);
            var totalRecords = await _db.BloodPressureMeasurement.CountAsync();
            var allRecords = await GetRecords();

            var stdDevs = GetStdDev(allRecords, avgSystolic, avgDiastolic, totalRecords);

            var stdevSystolic = stdDevs.systolicStdev;
            var stdevDiastolic = stdDevs.diastolicStdev;


            IEnumerable<BloodPressureMeasurement> recordsFiltered = allRecords.Where(record => (
                (CalculateZScore(record.SystolicMeasurement, avgSystolic, stdevSystolic) > (threshold / 100)) ||
                (CalculateZScore(record.DiastolicMeasurement, avgDiastolic, stdevDiastolic) > (threshold / 100))
                )
            );

            return recordsFiltered;
        }

    }
}

