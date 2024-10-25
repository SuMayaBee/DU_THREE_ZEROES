CREATE TABLE IF NOT EXISTS "travel_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"destination" varchar(255) NOT NULL,
	"date" date NOT NULL,
	"is_completed" boolean DEFAULT false,
	"weather_event" text DEFAULT '',
	"blog" text DEFAULT ''
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "travel_plans" ADD CONSTRAINT "travel_plans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
