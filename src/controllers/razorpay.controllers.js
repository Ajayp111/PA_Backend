const { Contact, FundAccount, Payout, PayoutLink } =
  require("razorpayx-nodejs-sdk")();


//  create contact_id once the user register 
const createContact = async (user) => {
  const data = await Contact.create({
    name: user.name,
    email: user.email, 
    contact: user.mobile, //optional
  });
  return data;
};

// create fundAccount_id once the user register there bank details
const fundAccounts = async (bank) => {
  const fund = await FundAccount.create({
    contact_id: "cont_00000000000001",
    account_type: "bank_account",
    bank_account: {
      name: "Gaurav Kumar",
      ifsc: "HDFC0000053",
      account_number: "765432123456789",
    },
  });
  return data;
};

//Add fundaccount for UPI Razorpay  once the user add there upi details
const fundAccountUPI = async () => {
  const fund = await FundAccount.create({
    contact_id: 'contact_id',
    account_type: "vpa",
    vpa: {
      address: 'upi',
    },
  });
  return fund;
};

// payout for payment 
const payouts = async()=>{
    const pay = await Payout.create(
        {
            "account_number": "7878780080316316", // account from which u want to payouts   
            "fund_account_id": "fa_00000000000001",
            "amount": 1000000,
            "currency": "INR",
            "mode": "IMPS",
            "purpose": "refund",
            "queue_if_low_balance": true,
            "reference_id": "Acme Transaction ID 12345",
            "narration": "Acme Corp Fund Transfer",
        }
    );
    return pay
};

module.exports = {
    createContact,
    fundAccounts,
    fundAccountUPI,
    payouts
}


