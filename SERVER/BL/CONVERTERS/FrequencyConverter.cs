using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.CONVERTERS
{
   public static class FrequencyConverter
    {
        public static Frequency ConvertFrequencyToDAL(FrequencyDTO f)
        {
            return new Frequency
            {
           
            };
        }

        public static FrequencyDTO ConvertFrequencyToDTO(Frequency f)
        {
            return new FrequencyDTO
            {
               FrequencyId=f.FrequencyId,
               Exception=f.Exception,
               FrequencyMode=f.FrequencyMode,
               NumDays=f.NumDays
            };
        }
    }
}
