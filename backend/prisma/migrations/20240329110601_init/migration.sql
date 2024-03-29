-- CreateTable
CREATE TABLE "chat" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "chatid" INTEGER NOT NULL,
    "chatmessage" TEXT NOT NULL,
    "imageuri" TEXT,
    "datetime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "transaction_details" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "withdrawal_amt" DOUBLE PRECISION NOT NULL,
    "deposit_amt" DOUBLE PRECISION NOT NULL,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chatid_fkey" FOREIGN KEY ("chatid") REFERENCES "chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
