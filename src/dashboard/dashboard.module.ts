import { Module } from "@nestjs/common";
import { AppointmentModule } from "src/appointments/appointment.module";
//user imports
import { FacilityModule } from "src/facilities/facility.module";
import { PracticeModule } from "src/practice/practice.module";
import { UsersModule } from "src/users/users.module";
import { DashboardResolver } from "./dashboard.resolver";
import { DashboardService } from "./dashboard.service";

@Module({
	imports: [
		UsersModule,
		FacilityModule,
		PracticeModule,
		AppointmentModule
	],
	providers: [
		DashboardService,
		DashboardResolver
	],
	exports: [],
})
export class DashboardModule { }
