import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const selectAmount = createDraftSafeSelector(
  (state) => state.finance,
  (finance) => finance.amount
);

export const selectPaymentStatus = createDraftSafeSelector(
  (state) => state.finance,
  (finance) => finance.paymentStatus
);

export const selectPayments = createDraftSafeSelector(
  (state) => state.finance,
  (finance) => finance.payments
);

export const selectCredit = createDraftSafeSelector(
  (state) => state.finance,
  (finance) => finance.credit
);
