-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "displayname" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gym" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Gym_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sport" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GymsOnSports" (
    "gymId" INTEGER NOT NULL,
    "sportId" INTEGER NOT NULL,

    CONSTRAINT "GymsOnSports_pkey" PRIMARY KEY ("gymId","sportId")
);

-- CreateTable
CREATE TABLE "_UserGyms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserSports" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserGyms_AB_unique" ON "_UserGyms"("A", "B");

-- CreateIndex
CREATE INDEX "_UserGyms_B_index" ON "_UserGyms"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserSports_AB_unique" ON "_UserSports"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSports_B_index" ON "_UserSports"("B");

-- AddForeignKey
ALTER TABLE "GymsOnSports" ADD CONSTRAINT "GymsOnSports_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GymsOnSports" ADD CONSTRAINT "GymsOnSports_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGyms" ADD CONSTRAINT "_UserGyms_A_fkey" FOREIGN KEY ("A") REFERENCES "Gym"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGyms" ADD CONSTRAINT "_UserGyms_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSports" ADD CONSTRAINT "_UserSports_A_fkey" FOREIGN KEY ("A") REFERENCES "Sport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSports" ADD CONSTRAINT "_UserSports_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
