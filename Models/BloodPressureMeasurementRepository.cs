using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;

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
    }
}

