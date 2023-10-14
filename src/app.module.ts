import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChangeGradeModule } from './Masters/change-grade/change-grade.module';
import { CompanyModule } from './Masters/company/company.module';
import { ContractorModule } from './Masters/contractor/contractor.module';
import { DefectModule } from './Masters/defect/defect.module';
import { DefectdeptModule } from './Masters/defectdept/defectdept.module';
import { DesignationModule } from './Masters/designation/designation.module';
import { EmployeeModule } from './Masters/employee/employee.module';
import { FabricTypeModule } from './Masters/fabric-type/fabric-type.module';
import { GradeModule } from './Masters/grade/grade.module';
import { InspectionMachineModule } from './Masters/inspection-machine/inspection-machine.module';
import { InspectionShedModule } from './Masters/inspection-shed/inspection-shed.module';
import { LoomModule } from './Masters/loom/loom.module';
import { ShiftDetailsModule } from './Masters/shift-details/shift-details.module';
import { SortModule } from './Masters/sort/sort.module';
import { ControlSettingsModule } from './Settings/control-settings/control-settings.module';
import { FileLocationModule } from './Settings/file-location/file-location.module';
import { GradeSettingsModule } from './Settings/grade-settings/grade-settings.module';
import { InspSettingsModule } from './Settings/insp-settings/insp-settings.module';
import { ManualGrnModule } from './Settings/manual-grn/manual-grn.module';
import { MenuDelegationModule } from './Settings/menu-delegation/menu-delegation.module';
import { PointsSettingModule } from './Settings/points-setting/points-setting.module';
import { CutLookingModule } from './Transaction/cut-looking/cut-looking.module';
import { CutLookingApprovalModule } from './Transaction/cut-looking-approval/cut-looking-approval.module';
import { JumboBatchModule } from './Transaction/jumbo-batch/jumbo-batch.module';
import { ManualEntryModule } from './Transaction/manual-entry/manual-entry.module';
import { RePrintModule } from './Transaction/re-print/re-print.module';
import { StatusChangeModule } from './Transaction/status-change/status-change.module';
import { ApprovedModule } from './RollStatus/approved/approved.module';
import { CompletedModule } from './RollStatus/completed/completed.module';
import { InProgressModule } from './RollStatus/in-progress/in-progress.module';
import { PendingModule } from './RollStatus/pending/pending.module';
import { DeleteRollModule } from './PostInspection/delete-roll/delete-roll.module';
import { EditRollModule } from './PostInspection/edit-roll/edit-roll.module';
import { MergeRollModule } from './PostInspection/merge-roll/merge-roll.module';
import { ReInspectionModule } from './PostInspection/re-inspection/re-inspection.module';
import { MDIModule } from './MDI-Form/mdi-form.module';
import { LoginFormModule } from './Login-Form/login-form.module';
import { FidastoSapModule } from './DespatchApproval/fidasto-sap/fidasto-sap.module';
import { TransFidasToSapModule } from './DespatchApproval/trans-fidas-to-sap/trans-fidas-to-sap.module';
import { MasterApiModule } from './master-api/master-api.module';
import { PackingListModule } from './Transaction/packing-list/packing-list.module';
import { GrnControlSettingsModule } from './Settings/grn-control-settings/grn-control-settings.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'newuser',
    password: 'fidas123',
    database: 'bksfidasgrey',
    entities: [],
    //synchronize:true,
    autoLoadEntities: true,
  }),
    ChangeGradeModule,
    CompanyModule,
    ContractorModule,
    DefectModule,
    DefectdeptModule,
    DesignationModule,
    EmployeeModule,
    FabricTypeModule,
    GradeModule,
    InspectionMachineModule,
    InspectionShedModule,
    LoomModule,
    ShiftDetailsModule,
    SortModule,
    ControlSettingsModule,
    FileLocationModule,
    GradeSettingsModule,
    InspSettingsModule,
    ManualGrnModule,
    MenuDelegationModule,
    PointsSettingModule,
    CutLookingModule,
    CutLookingApprovalModule,
    JumboBatchModule,
    ManualEntryModule,
    RePrintModule,
    StatusChangeModule,
    ApprovedModule,
    CompletedModule,
    InProgressModule,
    PendingModule,
    DeleteRollModule,
    EditRollModule,
    MergeRollModule,
    ReInspectionModule,
    MDIModule,
    LoginFormModule,
    FidastoSapModule,
    TransFidasToSapModule,
    MasterApiModule,
    PackingListModule,
    GrnControlSettingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
