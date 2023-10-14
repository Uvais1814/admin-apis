import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, RepositoryNotTreeError, Sort } from 'typeorm';
import { PointsSettingEntity } from 'src/Settings/points-setting/points-setting.entity';
import { InspectionMain } from 'src/PostInspection/delete-roll/entities/inspection-main.entity';
import { SortEntity } from 'src/Masters/sort/sort.entity';
import { EmployeeEntity } from 'src/Masters/employee/employee.entity';
import { InspectionMachineEntity } from 'src/Masters/inspection-machine/inspection-machine.entity';
import { DefectDetailsEntity } from 'src/PostInspection/delete-roll/entities/defect-details.entity';
import { GrnEntryEntity } from 'src/RollStatus/approved/entites/grn-entry.entity';
import { DefectEntity } from 'src/Masters/defect/defect.entity';
import { ShiftEntity } from 'src/Masters/shift-details/shift-details.entity';
import { GradeSettingsEntity } from 'src/Settings/grade-settings/grade-settings.entity';
import { DefectDeptEntity } from 'src/Masters/defectdept/defectdept.entity';
import { LoomEntity } from 'src/Masters/loom/loom.entity';
import { InspectionDTO } from 'src/DTOs/inspection-main.dto';
import { DefectDetailsDTO } from 'src/DTOs/defect-details.dto';
import { ActualEntryEntity } from 'src/PostInspection/delete-roll/entities/actual-entry.entity';
import { ActualEntryDTO } from 'src/DTOs/actual-entry.dto';
import { RawInspectionDTO } from 'src/DTOs/raw-inspection-main.dto';
import { RawInspectionEntity } from 'src/PostInspection/delete-roll/entities/raw-inspectionmain.entity';
import { RawDefectDetailsEntity } from 'src/PostInspection/delete-roll/entities/raw-defectdetails.entity';
import { RawDefectDetailsDTO } from 'src/DTOs/raw-defect-details.dto';
import { FabricTypeEntity } from 'src/Masters/fabric-type/fabric-type.entity';

@Injectable()
export class ManualEntryService {
  constructor(
    @InjectRepository(PointsSettingEntity)
    private readonly PointsRepo: Repository<PointsSettingEntity>,
    @InjectRepository(InspectionMain)
    private readonly InspRepo: Repository<InspectionMain>,
    @InjectRepository(SortEntity)
    private readonly SortRepo: Repository<SortEntity>,
    @InjectRepository(EmployeeEntity)
    private readonly EmployeeRepo: Repository<EmployeeEntity>,
    @InjectRepository(InspectionMachineEntity)
    private readonly MachineRepo: Repository<InspectionMachineEntity>,
    @InjectRepository(DefectDetailsEntity)
    private readonly DefectDetailsRepo: Repository<DefectDetailsEntity>,
    @InjectRepository(GrnEntryEntity)
    private readonly GrnRepo: Repository<GrnEntryEntity>,
    @InjectRepository(DefectEntity)
    private readonly DefectRepo: Repository<DefectEntity>,
    @InjectRepository(ShiftEntity)
    private readonly ShiftRepo: Repository<ShiftEntity>,
    @InjectRepository(GradeSettingsEntity)
    private readonly GradeSetRepo: Repository<GradeSettingsEntity>,
    @InjectRepository(DefectDeptEntity)
    private readonly DefectDeptRepo: Repository<DefectDeptEntity>,
    @InjectRepository(LoomEntity)
    private readonly LoomRepo: Repository<LoomEntity>,
    @InjectRepository(ActualEntryEntity)
    private readonly ActualRepo: Repository<ActualEntryEntity>,
    @InjectRepository(RawInspectionEntity)
    private readonly RawInspRepo: Repository<RawInspectionEntity>,
    @InjectRepository(RawDefectDetailsEntity)
    private readonly RawDeftDetailsRepo: Repository<RawDefectDetailsEntity>,
    @InjectRepository(FabricTypeEntity)
    private readonly FabTypeRepo: Repository<FabricTypeEntity>
  ) { }

  async PointsDetails(): Promise<{ CustomPoints: string; ValueGiven: string }[]> {
    return this.PointsRepo.find({ select: ['CustomPoints', 'ValueGiven'] });
  }

  async dsEdit(piece: string, plant: string): Promise<any[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspPieceNo, S.SortNo, E.EmpName, M.InspectionMachineName, I.InspType, I.Width, I.EPI, I.PPI, I.Grade, I.InspEndShift, I.InspTotalMeter, I.InspNoofDefect, I.InspTotalPoint, I.InspNoOfMajor, I.InspSqMeter, I.InspSqYard, I.InspLinMeter, I.NetWeight, I.GrossWeight, I.Noofpiece, I.InspEndDate')
      .innerJoin('MastSort', 'S', 'S.SortId = I.InspSortID')
      .innerJoin('MastEmployee', 'E', 'E.EmpId = I.InspLoginID')
      .innerJoin('MastInspectionMachine', 'M', 'M.InspectionMachineID = I.InspMachineID')
      .where('I.InspPieceNo =:pieceNo', { pieceNo: piece })
      .andWhere('I.ApprovalStatus =:approval', { approval: 'Completed' })
      .andWhere('I.ActiveStatus =:activeStatus', { activeStatus: '1' })
      .andWhere('I.Plant =:plantNo', { plantNo: plant })
      .andWhere('S.Plant =:plantNo', { plantNo: plant })
      .andWhere('E.Plant =:plantNo', { plantNo: plant })
      .andWhere('M.Plant =:plantNo', { plantNo: plant })
      .getRawMany();
  }

  async dsEditDefect(Roll: string, Plant: string): Promise<any[]> {
    return this.DefectDetailsRepo
      .createQueryBuilder('D')
      .select('D.DeftStMeter, D.DeftEndMeter, D.DeftCode, D.DeftName, D.DeftPoint, D.DeftDept, D.DeftRemarks, D.MachineNo, I.InspPieceNo, D.DeftSerious, D.Department, D.DeftContinuous')
      .innerJoin('InspectionMain', 'I', 'I.InspID = D.InspID')
      .where('D.DeftLeftID =:left or D.DeftRightID =:right', { left: Roll, right: Roll })
      .andWhere('D.ActiveStatus =:activeStatus', { activeStatus: '1' })
      .andWhere('D.Plant =:plantNo', { plantNo: Plant })
      .andWhere('I.Plant =:plantNo', { plantNo: Plant })
      .getRawMany();
  }
  async GrnIDs(RollNo: string, plantNo: string): Promise<{ InspGrnID: string }[]> {
    return this.InspRepo.createQueryBuilder('inspectionMain')
      .select('DISTINCT inspectionMain.InspGrnID', 'InspGrnID')
      .where('inspectionMain.InspPieceNo = :rollNo', { rollNo: RollNo })
      .andWhere('inspectionMain.ActiveStatus = :activeStatus', { activeStatus: 1 })
      .andWhere('inspectionMain.Plant = :plantNo', { plantNo: plantNo })
      .getRawMany();
  }

  async FTID(Grn: bigint, plantNo: string): Promise<{ FabricTypeID: number }[]> {
    return this.GrnRepo.createQueryBuilder('GrnEntry')
      .select('DISTINCT GrnEntry.FabricTypeID', 'FabricTypeID')
      .where('GrnEntry.GrnID =:grn', { grn: Grn })
      .andWhere('GrnEntry.ActiveStatus = :activeStatus', { activeStatus: 1 })
      .andWhere('GrnEntry.Plant = :plantNo', { plantNo: plantNo })
      .getRawMany();
  }

  async dsDefect(fabTypeId: number): Promise<{ Defect: string, DefectID: number }[]> {
    return this.DefectRepo.createQueryBuilder('MastDefect')
      .select('MastDefect.Defect, MastDefect.DefectId')
      .where('MastDefect.FabricTypeID =:fab', { fab: fabTypeId })
      .andWhere('MastDefect.ActiveStatus = :activeStatus', { activeStatus: 1 })
      .getRawMany();
  }

  async dssEdit(Roll: string, Plant: string): Promise<InspectionMain[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspPieceNo, S.SortNo, E.EmpName, M.InspectionMachineName, I.InspType, I.Width, I.EPI, I.PPI, I.Grade, I.InspEndShift, I.InspTotalMeter, I.InspNoofDefect, I.InspTotalPoint, I.InspNoofMajor, I.InspSqMeter, I.InspSqYard, I.InspLinMeter, I.NetWeight, I.GrossWeight, I.NoofPiece, I.InspEndDate')
      .innerJoin('MastSort', 'S', 'S.SortId = I.InspSortID')
      .innerJoin('MastEmployee', 'E', 'E.EmpId = I.InspLoginID')
      .innerJoin('MastInspectionMachine', 'M', 'M.InspectionMacineID = I.InspMachineID')
      .where('I.InspPieceNo =:piece', { piece: Roll })
      .andWhere('I.ApprovalStatus =:status', { status: 'Completed' })
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .andWhere('E.Plant =:plantNo', { plantNo: Plant })
      .andWhere('M.Plant =:plantNo', { plantNo: Plant })
      .getRawMany();
  }

  async LoomID(grnID: number, Plant: string): Promise<{ LoomID: number }[]> {
    return this.GrnRepo.find({
      select: ['LoomID'],
      where: {
        GrnID: grnID,
        Plant: Plant
      },
    });
  }

  async VendorID(grnID: number, Plant: string): Promise<{ VendorID: number }[]> {
    return this.GrnRepo.find({
      select: ['VendorID'],
      where: {
        GrnID: grnID,
        Plant: Plant
      },
    });
  }

  async Edit(Roll: string, Plant: string): Promise<InspectionMain[]> {
    return this.InspRepo
      .createQueryBuilder('I')
      .select('I.InspTotalMeter, I.InspNoofDefect, I.InspTotalPoint, I.InspNoOfMajor, I.NoofPiece')
      .where('I.InspPieceNo =:piece', { piece: Roll })
      .andWhere('I.ApprovalStatus =:status', { status: 'Completed' })
      .andWhere('I.ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('I.Plant =:plantNo', { plantNo: Plant })
      .getRawMany();
  }

  async CurrentMeter(pieceNo: string, Plant: string): Promise<{ InspTotalMeter: number }[]> {
    return this.InspRepo.find({
      select: ['InspTotalMeter'],
      where: {
        InspPieceNo: pieceNo,
        Plant: Plant
      },
    });
  }

  async CmbMachine(Plant: string): Promise<{ InspectionMachineName: string, InspectionMachineID: number }[]> {
    return this.MachineRepo.find({
      select: ['InspectionMachineName', 'InspectionMachineID'],
      where: {
        Plant: Plant
      },
    });
  }

  async Operator(Plant: string): Promise<{ EmpName: string, EmpId: number }[]> {
    return this.EmployeeRepo.find({
      select: ['EmpName', 'EmpId'],
      where: {
        Plant: Plant
      },
    });
  }

  async Sort(Plant: string): Promise<{ SortNo: string, SortId: number }[]> {
    return this.SortRepo.find({
      select: ['SortNo', 'SortId'],
      where: {
        ActiveStatus: 1,
        Plant: Plant
      },
    });
  }

  async Shift(Plant: string): Promise<{ ShiftName: string, ShiftID: number }[]> {
    return this.ShiftRepo.find({
      select: ['ShiftName', 'ShiftID'],
      where: {
        ActiveStatus: 1,
        Plant: Plant
      },
    });
  }

  async Points(): Promise<{ CustomPoints: string, PointsID: number }[]> {
    return this.PointsRepo.find({
      select: ['CustomPoints', 'PointsID'],
      where: {
        ActiveStatus: 1,
      },
    });
  }

  async FTNames(): Promise<{ Type: string }[]> {
    return this.FabTypeRepo.createQueryBuilder('MastFabricType')
      .select('DISTINCT MastFabricType.FabricTypeID')
      .where('MastFabricType.FabricTypeID = :fab', { fab: '2' })
      .andWhere('MastFabricType.ActiveStatus = :activeStatus', { activeStatus: 1 })
      .getRawMany();
  }

  async dsGrade(fabName: string): Promise<{ InternalGrade: string }[]> {
    return this.GradeSetRepo.createQueryBuilder('TblGradeSettings')
      .select('DISTINCT TblGradeSettings.InternalGrade')
      .where('TblGradeSettings.TypeOfFabric = :fab', { fab: fabName })
      .andWhere('TblGradeSettings.ActiveStatus = :activeStatus', { activeStatus: 1 })
      .andWhere("TblGradeSettings.InternalGrade not in ('Waste')")
      .getRawMany();
  }

  // async SortwD(Plant: string, SortNo: string): Promise<{ SortId: number }[]> {
  //   return this.SortRepo.find({
  //     select: ['SortId'],
  //     where: {
  //       ActiveStatus: 1,
  //       Plant: Plant,
  //       SortNo: SortNo
  //     },
  //   });
  // }

  async SortwD(Plant: string, Sortno?: string): Promise<{ SortId: number }[]> {
    const whereConditions: Record<string, any> = {
      ActiveStatus: 1,
      Plant: Plant,
    };

    if (Sortno && Sortno.trim() !== "") {
      whereConditions.SortNo = Sortno;
    }

    return this.SortRepo.find({
      select: ['SortId'],
      where: whereConditions,
    });
  }

  async dsRollNum(sortId: number, Plant: string): Promise<GrnEntryEntity[]> {
    return this.GrnRepo
      .createQueryBuilder('G')
      .select('G.LeftRoll, G.GrnID')
      .innerJoin('MastSort', 'S', 'G.SortID = S.SortID')
      .where('G.SortID =:sort', { sort: sortId })
      .andWhere('G.StatusInfo =:status', { status: '1' })
      .andWhere('G.ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .andWhere('G.Plant =:plantNo', { plantNo: Plant })
      .getRawMany();
  }

  async dsLotDetails(RollNo: string, Plant: string): Promise<GrnEntryEntity[]> {
    return this.GrnRepo
      .createQueryBuilder('G')
      .select('G.DeclareMeter, S.Width, G.LoomID, S.EPI, S.PPI, G.VendorID')
      .innerJoin('MastSort', 'S', 'G.SortID = S.SortID')
      .where('G.LeftRoll =:left', { left: RollNo })
      .andWhere('G.ActiveStatus =:activestatus', { activestatus: '1' })
      .andWhere('G.Plant =:plantNo', { plantNo: Plant })
      .andWhere('S.Plant =:plantNo', { plantNo: Plant })
      .getRawMany();
  }

  async grnwD(Roll: string, Plant: string): Promise<{ GrnID: number }[]> {
    return this.GrnRepo.find({
      select: ['GrnID'],
      where: {
        LeftRoll: Roll,
        ActiveStatus: 1,
        Plant: Plant
      },
    });
  }

  async FTIDs(GrnID: number, Plant: string): Promise<{ FabricTypeID: number }[]> {
    return this.GrnRepo.createQueryBuilder('GrnEntry')
      .select('DISTINCT GrnEntry.FabricTypeID')
      .where('GrnEntry.GrnID = :grn', { grn: GrnID })
      .andWhere('GrnEntry.ActiveStatus = :activeStatus', { activeStatus: 1 })
      .andWhere('GrnEntry.Plant =:plant', { plant: Plant })
      .getRawMany();
  }

  async FTName(FabricType: number): Promise<{ Type: string }[]> {
    return this.FabTypeRepo.createQueryBuilder('MastFabricType')
      .select('DISTINCT Type')
      .where('FabricTypeID =:fab', { fab: FabricType })
      .andWhere('ActiveStatus = :activeStatus', { activeStatus: 1 })
      .getRawMany();
  }

  async dsDefectDetails(defect: string): Promise<{ code: string, DefectDeptId: number }[]> {
    return this.DefectRepo.createQueryBuilder('MastDefect')
      .select('DISTINCT MastDefect.Code, MastDefect.DefectDeptId')
      .where('MastDefect.Defect =:deft', { deft: defect })
      .getRawMany();
  }

  async dsDepartDetails(deftDeptID: number): Promise<{ Name: string, Code: string }[]> {
    return this.DefectDeptRepo.find({
      select: ['Name', 'Code'],
      where: {
        DefectDeptID: deftDeptID
      },
    });
  }

  async LoomwD(loomID: number): Promise<{ loomcode: string }[]> {
    return this.LoomRepo.find({
      select: ['loomcode'],
      where: {
        LoomID: loomID,
        Activestatus: 1
      },
    });
  }

  async MIDwD(MacName: string, PlantNo: string): Promise<{ InspectionMachineID: number }[]> {
    return this.MachineRepo.find({
      select: ['InspectionMachineID'],
      where: {
        InspectionMachineName: MacName,
        ActiveStatus: 1,
        Plant: PlantNo,
      },
    });
  }

  async Mpts(): Promise<{ ValueGiven: string }[]> {
    return this.PointsRepo.find({
      select: ['ValueGiven'],
      where: {
        CustomPoints: 'Mendable'
      },
    });
  }

  async InspID(Name: string, PlantNo: string): Promise<{ EmpId: number }[]> {
    return this.EmployeeRepo.find({
      select: ['EmpId'],
      where: {
        EmpName: Name,
        ActiveStatus: 1,
        Plant: PlantNo,
      },
    });
  }

  async updateInspectionMain(pieceNo: string, PlantNo: string, updateData: InspectionDTO): Promise<InspectionMain[]> {
    const InspectionToUpdate = await this.InspRepo.find({
      where: {
        InspPieceNo: pieceNo,
        Plant: PlantNo,
      },
    });

    for (const Insp of InspectionToUpdate) {
      Insp.InspLotNo = updateData.InspLotNo;
      Insp.InspPieceNo = updateData.InspPieceNo;
      Insp.InspSortID = updateData.InspSortID;
      Insp.InspGrnID = updateData.InspGrnID;
      Insp.InspPartySort = updateData.InspPartySort;
      Insp.InspTotalMeter = updateData.InspTotalMeter;
      Insp.Loomno = updateData.Loomno;
      Insp.Vendor = updateData.Vendor;
      Insp.InspTotalPoint = updateData.InspTotalPoints;
      Insp.InspTotalMinor = updateData.InspTotalMinor;
      Insp.InspTotalMajor = updateData.InspTotalMajor;
      Insp.InspNoofDefect = updateData.InspNoofDefect;
      Insp.InspNoOfMinor = updateData.InspNoOfMinor;
      Insp.InspNoOfMajor = updateData.InspNoOfMajor;
      Insp.InspLinMeter = updateData.InspLinMeter;
      Insp.InspSqMeter = updateData.InspSqMeter;
      Insp.InspSqYard = updateData.InspSqYard;
      Insp.InspMachineID = updateData.InspMachineID;
      Insp.InspRemark = updateData.InspRemark;
      Insp.InspLoginID = updateData.InspLoginID;
      Insp.InspType = updateData.InspType;
      Insp.Grade = updateData.Grade;
      Insp.ExtraField1 = updateData.ExtraField1;
      Insp.NetWeight = updateData.NetWeight;
      Insp.GrossWeight = updateData.GrossWeight;
      Insp.NoOfPiece = updateData.NoOfPiece;
      Insp.Ozm = updateData.Ozm;
      Insp.ApprovalStatus = updateData.ApprovalStatus;
      Insp.InspNoofMendable = updateData.InspNoofMendable;
      Insp.InspNoofMendPoints = updateData.InspNoofMendPoints;
      Insp.InspNoofCont = updateData.InspNoofCont;
      Insp.InspNoofContPoints = updateData.InspNoofContPoints;
      Insp.EPI = updateData.EPI;
      Insp.PPI = updateData.PPI;
      Insp.Width = updateData.Width;
      Insp.InspNoofWhiteTag = updateData.InspNoofWhiteTag;
      Insp.InspWhiteTagPoints = updateData.InspWhiteTagPoints;
      Insp.InspNoofRedTag = updateData.InspNoofRedTag;
      Insp.InspRedTagPoints = updateData.InspRedTagPoints;
      Insp.ReInspRemark = updateData.ReInspRemark;
      Insp.InspReInspected = updateData.InspReInspected;

      await this.InspRepo.save(Insp);
    }
    return InspectionToUpdate;
  }

  async InspId(pieceNo: string, PlantNo: string): Promise<{ InspID: bigint }[]> {
    return this.InspRepo.find({
      select: ['InspID'],
      where: {
        InspPieceNo: pieceNo,
        Plant: PlantNo,
      },
    });
  }

  async updateRollJoinInfo(InspID: bigint, plant: string, Rollinfo: string): Promise<InspectionMain[]> {
    const rolljoinInfo = await this.InspRepo.find({
      where: {
        InspID: InspID,
        Plant: plant,
      },
    });
    for (const roll of rolljoinInfo) {
      roll.RollJoinInfo = Rollinfo;

      await this.InspRepo.save(roll);
    }
    return rolljoinInfo;
  }

  async updateExtraFields(InspID: bigint, plant: string, field: string): Promise<InspectionMain[]> {
    const ExtraField = await this.InspRepo.find({
      where: {
        InspID: InspID,
        Plant: plant,
      },
    });
    for (const fields of ExtraField) {
      fields.ExtraField1 = field;

      await this.InspRepo.save(fields);
    }
    return ExtraField;
  }

  async deleteDefectDetails(ID: number, pl: string, activestatus: number): Promise<DefectDetailsEntity[]> {
    const DefectDetailsToDelete = await this.DefectDetailsRepo.find({
      where: {
        InspID: ID,
        Plant: pl,
      },
    });
    for (const defect of DefectDetailsToDelete) {
      defect.ActiveStatus = activestatus;
      await this.DefectDeptRepo.save(defect);
    }
    return DefectDetailsToDelete;
  }

  async createDefectDetails(updateDefect: DefectDetailsDTO): Promise<DefectDetailsEntity> {
    const newDefectDetails = this.DefectDetailsRepo.create(updateDefect)
    await this.DefectDetailsRepo.save(newDefectDetails);
    return newDefectDetails;
  }

  async createRawDefectDetails(updateDefect: RawDefectDetailsDTO): Promise<RawDefectDetailsEntity> {
    const newRawDefectDetails = this.RawDeftDetailsRepo.create(updateDefect)
    await this.RawDeftDetailsRepo.save(newRawDefectDetails);
    return newRawDefectDetails;
  }

  async deleteActualEntry(Roll: string, pl: string, activestatus: number): Promise<ActualEntryEntity[]> {
    const ActualEntryToDelete = await this.ActualRepo.find({
      where: {
        RollNo: Roll,
        Plant: pl,
      },
    });
    for (const act of ActualEntryToDelete) {
      act.Activestatus = activestatus;
      await this.ActualRepo.save(act);
    }
    return ActualEntryToDelete;
  }

  async dShade(roll: string): Promise<ActualEntryEntity[]> {
    return this.ActualRepo.find({
      where: {
        RollNo: roll,
      },
      take: 1,
    });
  }

  async createActualEntry(updateActual: ActualEntryDTO): Promise<ActualEntryEntity> {
    const newActualEntry = this.ActualRepo.create(updateActual)
    await this.ActualRepo.save(newActualEntry)
    return newActualEntry;
  }

  async updateExtraField(pieceNo: string, plant: string, updateData: InspectionDTO): Promise<InspectionMain[]> {
    const ExtraField = await this.InspRepo.find({
      where: {
        InspPieceNo: pieceNo,
        Plant: plant,
      },
    });
    for (const fields of ExtraField) {
      fields.ExtraField4 = updateData.ExtraField4,
        fields.ExtraField3 = updateData.ExtraField3,
        await this.InspRepo.save(fields);
    }
    return ExtraField;
  }

  async deleteInspectionMain(Roll: string, pl: string, activestatus: number): Promise<InspectionMain[]> {
    const InspectionToDelete = await this.InspRepo.find({
      where: {
        InspPieceNo: Roll,
        Plant: pl,
      },
    });
    for (const Insp of InspectionToDelete) {
      Insp.ActiveStatus = activestatus;
      await this.InspRepo.save(Insp);
    }
    return InspectionToDelete;
  }

  async createInspectionMain(updateInspection: InspectionDTO): Promise<InspectionMain> {
    const newInspectionMain = await this.InspRepo.create(updateInspection)
    await this.InspRepo.save(newInspectionMain)
    return newInspectionMain;
  }

  async createRawInspectionMain(updateInspection: RawInspectionDTO): Promise<RawInspectionEntity> {
    const newRawInspectionMain = await this.RawInspRepo.create(updateInspection)
    await this.RawInspRepo.save(newRawInspectionMain)
    return newRawInspectionMain;
  }
  async updateGrnEntry(Roll: string, status: number): Promise<GrnEntryEntity[]> {
    const GrntoUpdate = await this.GrnRepo.find({
      where: {
        LeftRoll: Roll,
        ActiveStatus: 1
      },
    });
    for (const Insp of GrntoUpdate) {
      Insp.StatusInfo = status
      await this.GrnRepo.save(Insp);
    }
    return GrntoUpdate;
  }

  async OZwD(sorID: number, plant: string): Promise<{ OZ: number }[]> {
    return this.SortRepo.find({
      select: ['OZ'],
      where: {
        SortId: sorID,
        ActiveStatus: 1,
        Plant: plant
      },
    })
  }
}