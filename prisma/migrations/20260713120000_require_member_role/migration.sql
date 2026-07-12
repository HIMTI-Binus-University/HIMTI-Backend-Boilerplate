-- Fail explicitly rather than assigning an arbitrary role to existing members.
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM "Member" WHERE "roleId" IS NULL) THEN
        RAISE EXCEPTION 'Cannot require Member.roleId while members without roles exist';
    END IF;
END $$;

-- Replace the nullable foreign key behavior before making the column required.
ALTER TABLE "Member" DROP CONSTRAINT "Member_roleId_fkey";
ALTER TABLE "Member" ALTER COLUMN "roleId" SET NOT NULL;
ALTER TABLE "Member" ADD CONSTRAINT "Member_roleId_fkey"
    FOREIGN KEY ("roleId") REFERENCES "Role"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
