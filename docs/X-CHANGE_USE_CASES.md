# **Use Cases Compendium**

### *Pay Code Across Industries & Institutions*

---

Pay Code's three transaction primitives — **Redeemable**, **Payable**, and **Settlement** — map to virtually every scenario where value moves between institutions and individuals. This compendium presents twelve verticals, each identifying the actors, voucher type(s), and the operational problem Pay Code solves.

---

## Quick Reference: Voucher Type by Vertical

| Vertical | Redeemable | Payable | Settlement |
|----------|:----------:|:-------:|:----------:|
| Government Financial Assistance | ✓ | | |
| Health Insurance (PhilHealth) | | ✓ | ✓ |
| Private Insurance & HMOs | | | ✓ |
| Government Contractor Payments | ✓ | | ✓ |
| Utility Billing & Collection | | ✓ | |
|| Micro-Finance | | | ✓ |
| Gaming & Lottery | ✓ | ✓ | |
| Public Transport | | ✓ | |
| Field Work Validation | ✓ | | ✓ |
| Remote Polling & Research | ✓ | | |
| OFW Remittance & FX | ✓ | | |
| Corporate Disbursements | ✓ | | |

---

## 1. Government Financial Assistance (Ayuda)

**Voucher Type:** Redeemable

**Problem:** Government cash transfers — monthly stipends for senior citizens and PWDs, calamity aid, agricultural subsidies — rely on manual cash payouts, physical attendance, and paper-based acknowledgment. Administrative overhead is high and fraud detection is reactive.

**Actors:**

- **Issuer** — LGU (municipal/city/provincial) or national agency (DSWD, DA, DAR) via partner bank
- **Beneficiary** — Senior citizen, PWD, household, farmer, student
- **Distribution Channel** — Barangay hall, bank branch/agent, mobile-assisted staff
- **Settlement Authority** — Partner bank or Pay Code clearing platform

**How Pay Code Works:**

1. Agency submits validated beneficiary roster
2. Pay Codes generated in bulk — one per beneficiary per period
3. Codes delivered via SMS or barangay notice
4. Beneficiary presents code at any authorized payout point; ID validated; cash released or account credited
5. Funds debited from agency-funded account; settlement reports generated per barangay/period

**Why It Matters:**

- Eliminates ghost beneficiaries and double-dipping
- Enforces time-bound redemption with automatic cutoff
- Full traceability from allocation to payout — COA audit-ready
- No bank account or smartphone required
- Scales from municipal stipends (hundreds) to national calamity relief (millions)

---

## 2. Health Insurance — PhilHealth

**Voucher Types:** Payable + Settlement

**Problem:** PhilHealth reimburses hospitals based on case rate tariffs. The beneficiary is passive after treatment — claims validation is entirely provider-driven and documentation-based. There is no beneficiary-visible artifact linking patient, service, and payment.

**Actors:**

- **Insurer** — PhilHealth
- **Beneficiary** — Member/patient (or authorized proxy)
- **Provider** — Accredited hospital or clinic
- **Settlement Authority** — Government bank or Pay Code clearing platform

**How Pay Code Works:**

1. Patient receives treatment; hospital determines applicable PhilHealth tariff
2. Hospital issues a **zero-denominated settlement Pay Code** — a settlement reference, not a payment
3. Patient activates the code via SMS or assisted terminal (~10–20 seconds)
4. Hospital submits claim to PhilHealth with Pay Code as mandatory reference
5. PhilHealth validates eligibility + tariff + beneficiary activation; settles to hospital

**Why It Matters:**

- Introduces a **beneficiary acknowledgment layer** — no activation, no payable claim
- Eliminates unacknowledged and ghost claims
- Patient adds ~10 seconds of effort; hospital adds ~10 seconds at billing
- Strengthens COA audit trails without changing tariffs, coverage, or care delivery
- Works on feature phones; proxy support for elderly/minors/incapacitated

---

## 3. Private Insurance & HMOs — Beneficiary-Anchored Settlement

**Voucher Type:** Settlement

**Problem:** Private HMOs (Intellicare, Maxicare, ValueCare) and motor/property insurers face the same structural issue as PhilHealth: claims are provider-initiated, documentation-heavy, and beneficiary-invisible. LOA (Letter of Authorization) bottlenecks delay provider payment.

**Actors:**

- **Insurer** — HMO, motor insurer, property insurer
- **Beneficiary** — Patient, vehicle owner, policyholder
- **Provider** — Doctor's clinic, diagnostic center, repair shop
- **Settlement Authority** — Partner bank

**How Pay Code Works:**

1. Provider delivers service (consultation, repair, diagnostic)
2. Provider issues a **zero-denominated settlement Pay Code** with policy reference, service code, and target amount
3. Beneficiary confirms service via SMS/QR (~10–20 seconds)
4. Provider submits claim with Pay Code reference
5. Insurer validates and settles to provider

**Why It Matters:**

- Single human confirmation at the exact point where trust is weakest
- Speeds up provider payment — clinics and shops get paid faster
- Reduces claim cycle time and disputes
- No tariff changes, no clinical interference, no insurer lock-in
- Generalizes across all service-based indemnity: health, motor, property

**POS Integration:** Accredited providers can issue settlement Pay Codes directly from existing POS terminals via x-Change API — no new hardware, no consumer app, no cash handling. The POS becomes a claim initiation instrument.

---

## 4. Government Contractor & Vendor Payments

**Voucher Types:** Redeemable + Settlement

**Problem:** Government payments to contractors are large, milestone-based, heavily audited, and operationally slow. Checks are still common. Release cycles are long. Reconciliation between agencies, contractors, and banks is manual.

**Actors:**

- **Issuer** — Government agency (national or local)
- **Payee** — Contractor, supplier, utility provider
- **Approving Authority** — Project manager, finance unit, authorized signatory
- **Settlement Authority** — Government bank

**How Pay Code Works:**

1. Contractor submits invoice or SOA; agency validates delivery/milestone
2. Internal approvals completed; approved amount encoded into a **settlement Pay Code** bound to a Settlement Envelope
3. Envelope collects evidence: delivery reports, inspection certificates, authorization signals
4. All gates pass → Pay Code released to contractor
5. Contractor redeems to bank account of choice

**Why It Matters:**

- Separates approval from settlement — funds release only when conditions are met
- Eliminates check loss and fraud
- Full digital audit trail from budget → obligation → disbursement → settlement
- Supports partial releases, retainage, and multi-agency co-funded projects
- Aligns with COA transparency mandates

---

## 5. Utility Billing & Collection

**Voucher Type:** Payable

**Problem:** Electric, water, and telecom utilities collect payments from millions of customers — many paying in cash at agents, kiosks, or OTC channels. Each wallet integration is separate. Reconciliation is expensive and posting is delayed.

**Actors:**

- **Issuer** — Utility company (via partner bank)
- **Payer** — Household, SME, prepaid/postpaid subscriber
- **Collection Channel** — Bank branch, payment center, mobile wallet, field collector
- **Settlement Authority** — Partner bank

**How Pay Code Works:**

1. Utility generates billing reference → corresponding payable Pay Code issued
2. Pay Code printed on bill, sent via SMS/email, or given verbally
3. Customer presents code at any authorized channel; pays exact or variable amount
4. System validates code, account format, amount rules, and channel authorization
5. Funds credited to utility settlement account; automatic posting and reconciliation

**Why It Matters:**

- **One code, every wallet** — no per-channel integration
- Supports partial payments and late-fee automation
- Works offline via field collectors
- Eliminates manual exception handling
- High-volume, low-cost — millions of transactions per month

---

## 6. Micro-Finance — Disbursement & Repayment

**Voucher Type:** Settlement

**Problem:** Micro-finance borrowers prefer digital funds but resist being forced into a specific bank or wallet. Traditional models require account opening, app installation, and ecosystem lock-in — creating friction that excludes the most vulnerable borrowers. On the lender side, disbursement and repayment are managed as separate flows across different rails, increasing complexity and reconciliation cost.

**Actors:**

- **Lender** — MFI, cooperative, fintech, bank
- **Borrower** — Informal worker, small merchant, gig participant, rural borrower
- **Receiving Channel** — Any e-wallet, bank account, or cash-out agent
- **Settlement Authority** — Partner bank or Pay Code platform

**How Pay Code Works:**

The lender issues a **single settlement Pay Code** that is both redeemable and payable. The settlement voucher carries two amounts:

- **Denomination (redeemable):** ₱1,000 — the loan principal the borrower can redeem
- **Target amount (payable):** ₱1,100 — the total repayment amount (principal + interest)

**One code, full lifecycle:**

1. Loan approved; lender issues a settlement Pay Code with ₱1,000 denomination and ₱1,100 target amount, bound to a Settlement Envelope
2. Envelope gates validate: KYC verification, credit committee approval, collateral documentation (if applicable)
3. All gates pass → borrower **redeems ₱1,000** using the Pay Code to any wallet, bank, or cash-out agent
4. Later, borrower **repays ₱1,100** using the same Pay Code via any supported channel
5. Repayment recorded; envelope moves to SETTLED; full audit trail captured

The Settlement Envelope orchestrates the entire loan lifecycle — from conditional release through repayment — within a single instrument.

**Why It Matters:**

- **One Pay Code, two actions** — disburse and collect through the same reference
- Decouples **credit from custody** — borrowers choose their channel for both redemption and repayment
- Lenders retain full control over approval, limits, and repayment terms via Settlement Envelope gates
- Eliminates separate disbursement and collection integrations — one instrument, one reconciliation
- Banks become open lending rails, not closed ecosystems
- Scales micro-credit sustainably without sacrificing compliance

---

## 7. Gaming & Lottery

**Voucher Types:** Redeemable (cash-out) + Payable (cash-in)

**Problem:** Government casinos (PAGCOR), lottery operations (PCSO/STL), and online gaming platforms depend on physical cash, ATMs, and wallet lock-in. Kubradors carry cash. Operators lose control to wallet platforms. Reconciliation is complex.

**Actors:**

- **Issuer** — Casino operator, PCSO, online gaming platform
- **Player** — KYC-verified, age-checked patron
- **Intermediary** — Casino cashier, kubrador, local outlet, gaming agent
- **Settlement Authority** — Partner bank

**How Pay Code Works:**

**Cash-In (Payable):**
Player generates or scans a payable Pay Code → pays via preferred wallet or bank → gaming balance updated.

**Cash-Out (Redeemable):**
Winnings encoded into redeemable Pay Code → player redeems to wallet, bank, or agent → no physical cash required.

**Why It Matters:**

- Retains trusted intermediaries (cashiers, kubradors, agents) while digitizing value
- Reduces ATM congestion and on-premise cash exposure
- Prevents wallet monopolization — operators stay independent
- Mandatory age/identity verification enforced at Pay Code level
- Full audit trail for PAGCOR/PCSO regulatory compliance

---

## 8. Public Transport Fare Collection

**Voucher Type:** Payable

**Problem:** Government railways and ferry services need fast, cashless, inclusive fare collection. Stored-value cards require dedicated hardware. Turnstiles are expensive. Wallet-specific integrations create lock-in.

**Actors:**

- **Issuer** — Transport operator (railway, ferry authority, bus terminal)
- **Rider** — Commuter or passenger
- **Payment Channel** — Any QR PH–enabled wallet (GCash, Maya, BDO Pay)
- **Settlement Authority** — Partner bank

**How Pay Code Works:**

1. Transport operator generates a **payable Pay Code** → converts to QR PH
2. Same QR printed and displayed across terminal (walls, pillars, gates)
3. Rider scans QR with preferred wallet → pays fare
4. Rider receives SMS with secure boarding pass link (QR-based, airline-style)
5. Guard or scanner validates boarding QR — paid, unused, within time window

**Why It Matters:**

- Open-wallet payments: **any QR PH app works**
- Minimal hardware — no turnstiles, no NFC readers; just printed QR codes
- Single payable Pay Code supports thousands of concurrent payments
- ~15–25 seconds per rider — comparable to or faster than ticket booths
- Transport operators stay independent of wallet ecosystems

---

## 9. Field Work Validation & Compensation

**Voucher Types:** Redeemable + Settlement

**Problem:** Market research, opinion polling, census enumeration, and NGO verification rely on field workers (enumerators) who can fabricate respondents, invent interviews, or pocket cash incentives. Validation is post-facto and paper-based.

**Actors:**

- **Sponsor** — Research firm, government agency, NGO, academic institution
- **Field Worker / Enumerator** — Conducts surveys, issues Pay Codes at completion
- **Respondent** — Qualified individual who answers the survey and receives compensation
- **Settlement Authority** — Bank or Pay Code platform

**How Pay Code Works:**

1. Sponsor defines survey criteria, compensation amount, and validity rules
2. Field worker conducts survey with respondent
3. Upon completion, field worker issues a **redeemable Pay Code** tied to survey ID, location, timestamp
4. Respondent redeems code via SMS/QR → receives compensation via wallet, bank, or cash-out
5. Redemption proves: a real person, at the right place and time, actively participated

**Why It Matters:**

- **No validated respondent → no Pay Code → no payout**
- Eliminates ghost respondents, fabricated interviews, and bulk backfilling
- Geo-fenced, time-bound, single-use per respondent
- Generalizes beyond surveys: household audits, compliance inspections, mystery shopping, training attendance

---

## 10. Remote Polling & Civic Research

**Voucher Type:** Redeemable

**Problem:** Remote opinion polling suffers from low response rates, duplicate/bot responses, and manual incentive reconciliation. Survey links are easily forwarded and abused.

**Actors:**

- **Sponsor** — Polling organization, research firm, civic institution
- **Respondent** — Individual invited to participate
- **Survey Platform** — Jotform, SurveyMonkey, Google Forms, or custom endpoint
- **Settlement Authority** — Bank or Pay Code platform

**How Pay Code Works:**

1. Sponsor generates unique redeemable Pay Codes in bulk
2. Codes distributed via SMS link, email, or printed QR
3. Respondent opens link → validates code → redirected to survey with Pay Code as hidden reference field
4. Upon survey completion + redemption: incentive released to respondent's chosen channel

**Why It Matters:**

- Unifies invitation, validation, and compensation in a single flow
- One-person-one-incentive logic prevents duplication
- Full audit trail: Pay Code → survey response → payout
- Works on feature phones; no app install required

---

## 11. OFW Remittance & Cross-Border

**Voucher Type:** Redeemable

**Problem:** OFW families often lack stable bank accounts. Remittance recipients queue at pawn shops or collect from agents during limited hours. The sender has no visibility into when or how funds were claimed.

**Actors:**

- **Sender** — OFW (via remittance partner or app)
- **Recipient** — Family member in the Philippines
- **Receiving Channel** — Any wallet, bank, or cash-out agent
- **Settlement Authority** — Licensed remittance partner + Pay Code platform

**How Pay Code Works:**

1. OFW sends money through licensed partner
2. Recipient receives a redeemable Pay Code via SMS
3. Recipient claims funds at their convenience — any channel, any time
4. Sender receives confirmation of redemption

**Why It Matters:**

- Recipient chooses the channel — no forced ecosystem
- No bank account required
- Real-time sender visibility
- Reduces failed deliveries from wrong account numbers or expired wallets
- Compatible with cross-border rails and FX settlement

---

## 12. Corporate Disbursements

**Voucher Type:** Redeemable

**Problem:** Companies disbursing tips, commissions, rebates, loyalty rewards, and emergency advances face the same friction: collecting and maintaining bank details for thousands of recipients who change wallets, close accounts, or prefer cash.

**Actors:**

- **Issuer** — Employer, retailer, or corporate program owner
- **Recipient** — Employee, contractor, customer, loyalty member
- **Receiving Channel** — Any wallet, bank, or cash-out agent
- **Settlement Authority** — Partner bank

**How Pay Code Works:**

1. Company generates redeemable Pay Codes in bulk — one per recipient
2. Codes delivered via SMS, email, or internal system
3. Recipient redeems to preferred channel at their convenience
4. Settlement logged with full audit trail

**Why It Matters:**

- No need to collect or maintain bank details
- Recipients choose their channel — GCash, Maya, BDO, cash-out
- Works for variable-frequency payments: tips (daily), commissions (weekly), rebates (event-based)
- Reduces failed disbursements and support tickets

---

## Cross-Cutting Themes

### Recipient Autonomy
Across all use cases, the recipient — not the sender — chooses the channel. This is the fundamental difference between Pay Code and traditional push-based disbursement.

### No App Required
Every Pay Code works via SMS and QR. Feature phones are first-class citizens. No app installation, no account creation, no onboarding friction.

### Institutional Neutrality
Pay Code does not compete with wallets or banks. It connects them. Institutions retain custody, compliance, and customer relationships. x-Change provides the orchestration layer.

### Auditability by Design
Every Pay Code generates a complete audit trail: issuance → distribution → redemption/activation → settlement. This is not an add-on — it is inherent in the architecture.

### Programmable Rules
Expiry, geo-fencing, channel restrictions, amount bounds, identity requirements, and evidence gates are configured per Pay Code — not hardcoded. New use cases are launched by writing configuration, not code.

---

*For technical architecture details, see [Appendix B](APPENDIX_B.md). For financial projections and investment breakdown, see [Appendix A](APPENDIX_A.md).*
