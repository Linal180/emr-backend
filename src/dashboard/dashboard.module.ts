import { Module } from "@nestjs/common";
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
		PracticeModule
	],
	providers: [
		DashboardService,
		DashboardResolver
	],
	exports: [],
})
export class DashboardModule { }
