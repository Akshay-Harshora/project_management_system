// import {
//     Injectable
//   } from '@nestjs/common';
//   import { InjectRepository } from '@nestjs/typeorm';
//   import { Repository } from 'typeorm';
//   import { LookupDetails } from './entity/lookup-details.entity';
//   import { Lookups } from './entity/lookups.entity';

//   @Injectable()
//   export class LookupsService {
//     constructor(
//       @InjectRepository(LookupDetails)
//       private lookupDetailsRepository: Repository<LookupDetails>,
//       @InjectRepository(Lookups)
//       private lookupsRepository: Repository<Lookups>,
//     ) {}
  
//     async getLookupDetailsByCodes(
//       lookupCodes: string[],
//       lookupDetailCodes: string[]
//     ): Promise<LookupDetailsByCodesModel> {
//       const result = await this.lookupDetailsRepository
//         .createQueryBuilder('lookupDetails')
//         .innerJoin('lookupDetails.lookup', 'lookup')
//         .where('lookup.code IN (:...lookupCodes)', { lookupCodes })
//         .andWhere('lookupDetails.code IN (:...detailCodes)', {
//           detailCodes: lookupDetailCodes
//         })
//         .andWhere('lookupDetails.is_active = true')
//         .select([
//           'lookupDetails.id AS id',
//           'lookupDetails.code AS code',
//           'lookupDetails.name AS name',
//           'lookup.code AS "lookupCode"'
//         ])
//         .getRawMany<LookupDetailRawResult>();
//       const response: LookupDetailsByCodesModel = {};
//       if (result && result.length > 0) {
//         result.forEach((item) => {
//           const { id, code, name, lookupCode } = item;
  
//           if (!response[lookupCode]) {
//             response[lookupCode] = {};
//           }
  
//           response[lookupCode][code] = { id, name };
//         });
//       }
//       return response;
//     }

 
//   }
  