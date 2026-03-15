# x-Change: Comprehensive FAQ

## ❓ FUNDAMENTALS

**Q: What is x-Change?**  
A: x-Change is the **orchestration platform** behind **Pay Code** — a rail-agnostic payment instruction framework. It issues, validates, routes, and audits Pay Codes across institutions. Think of it as the invisible layer that connects banks, wallets, and agents — without holding funds, transmitting money, or requiring its own license.

**Q: What is a Pay Code?**  
A: A Pay Code is a **bearer alphanumeric reference** — not money, not a wallet, not a payment method — that resolves, validates, and executes a transaction over the issuer's existing regulated rails. It is to digital payments what the URL was to the internet: a universal addressing layer.

**Q: Who is this for?**  
A: x-Change serves **institutions** — banks, EMIs, lenders, insurers, government agencies, utilities, gaming operators, NGOs — that need to disburse, collect, or settle funds across incompatible rails. Recipients benefit by choosing when, where, and how to transact.

**Q: Is this a cryptocurrency or blockchain product?**  
A: No. Pay Code operates entirely in **fiat currency**, within **regulated financial institutions**. No tokens, no blockchain, no stored value.

---

## ❓ THREE VOUCHER TYPES

**Q: What are the three voucher types?**  
A: Pay Code supports three transaction primitives that cover the complete transaction surface:

1. **Redeemable** — Pull-based disbursement. Institution escrows funds; recipient chooses when and where to claim (bank, wallet, or cash-out agent).
2. **Payable** — Presentation-based collection. Payer presents code; pays through any supported channel; funds flow to collector.
3. **Settlement** — Gate-controlled conditional execution. Funds move only after structured evidence, approvals, and computed gate conditions all pass via a Settlement Envelope.

**Q: When do I use a Redeemable Pay Code?**  
A: When you're disbursing funds and the recipient should choose the channel. Examples: government ayuda, wages, tips, OFW remittances, micro-loan release, corporate rebates, disaster relief.

**Q: When do I use a Payable Pay Code?**  
A: When you're collecting payments and need one code that works across every wallet and bank. Examples: utility billing, loan repayment, gaming cash-in, public transport fares.

**Q: When do I use a Settlement Pay Code?**  
A: When fund release must be conditional — requiring document uploads, identity verification, authorization signals, or other prerequisites. Examples: PhilHealth claims, HMO reimbursement, motor insurance, home loan takeouts, government contractor payments.

**Q: Can a Settlement Pay Code carry a denomination?**  
A: Yes. Settlement vouchers may be:
- **Zero-denominated** — insurance claims where money flows between institutions (e.g., PhilHealth → hospital) and the beneficiary receives no cash
- **Positive-denominated** — micro-finance loans, contractor payments where funds are released to the recipient only after all gating conditions are met

The defining characteristic is the **Settlement Envelope**, not the denomination.

---

## ❓ SETTLEMENT ENVELOPE

**Q: What is the Settlement Envelope?**  
A: A structured evidence container bound to a Settlement Pay Code. It enforces prerequisites — document uploads, identity checks, authorization signals, and computed gate conditions — before settlement is permitted. Think of it as a programmable checklist that must be complete before money moves.

**Q: How are envelopes configured?**  
A: Via **YAML drivers** — declarative specifications of what evidence must be collected and what conditions must pass. Drivers define checklists (documents, payload fields, attestations), signals (boolean approvals from systems or humans), and gates (computed conditions that combine checklists and signals into a single `settleable` determination).

**Q: Can drivers be combined?**  
A: Yes. Drivers support **inheritance via `extends`**. A base driver defines common requirements; overlay drivers add context-specific items. Example: a married OFW buying a pre-selling property composes four drivers into 19 documents, 7 signals, and 9 gates — assembled declaratively, no code changes.

**Q: What happens if conditions aren't met?**  
A: Settlement is blocked. The envelope remains in an intermediate state until all gates pass. If conditions cannot be met, the envelope can be cancelled or rejected.

---

## ❓ HOW IT WORKS

**Q: How does a Redeemable Pay Code work?**  
A:
1. Institution escrows funds
2. Pay Code generated (QR, SMS, or printed token)
3. Recipient receives code
4. Recipient redeems at chosen channel — any wallet, bank, or cash-out agent
5. Funds released; audit logged

**Q: How does a Payable Pay Code work?**  
A:
1. Collector issues a payable Pay Code
2. Payer scans QR or enters code at any supported channel
3. Payment completed via any wallet or bank
4. Funds settled to collector

**Q: How does a Settlement Pay Code work?**  
A:
1. Provider issues settlement Pay Code
2. Evidence collected via Settlement Envelope (documents, signals, approvals)
3. Gate conditions evaluated
4. If all gates pass → settlement authorized → funds move
5. If gates fail → blocked until evidence is complete

**Q: Can issuers control redemption rules?**  
A: Yes. Per-Pay Code configuration includes:
- Expiry dates and auto-cancellation
- Channel restrictions (e.g., only GCash, only rural banks)
- Geo-fencing and time windows
- Amount bounds (exact, min, max)
- Identity verification requirements
- Redemption attempt limits

**Q: What if a Pay Code is stolen or misused?**  
A: Pay Codes can be revoked before use, linked to mobile/PIN, limited by expiry and attempt count, and require identity validation. For settlement vouchers, the envelope itself provides additional protection — stolen codes are useless without evidence submission.

---

## ❓ PAY CODE vs. EXISTING INSTRUMENTS

**Q: How is Pay Code different from a check?**  
A: A check is a paper-based bearer instruction killed by fraud, paper handling, and slow clearing. Pay Code is its digital successor: bearer-presentable, cryptographically secure, and executed over modern rails in real time. Same concept — *an instruction reference that triggers execution upon presentation* — without the paper.

**Q: How is Pay Code different from e-wallets?**  
A: Wallets are closed ecosystems — GCash users can't easily receive from BDO payroll. Pay Code is **rail-agnostic**: it works across wallets, banks, and cash-out agents. The recipient chooses the channel; no lock-in.

**Q: How is Pay Code different from bank transfers?**  
A: Bank transfers are push-based — the sender must know the exact account. Pay Code decouples value from destination. No account details needed upfront. The recipient decides.

**Q: Does Pay Code compete with banks or wallets?**  
A: No. Pay Code **connects** them. It is infrastructure, not a competing product. Banks and wallets retain custody, compliance, and customer relationships. x-Change provides the orchestration layer.

---

## ❓ REGULATION & LICENSING

**Q: Does x-Change require a BSP license?**  
A: No. x-Change operates **under** the regulatory perimeter of licensed banks and EMIs. It does not custody funds, transmit money, or create stored value. From a regulatory lens, Pay Code is closer to **biller reference numbers** and **transaction instruction identifiers** than to money instruments.

**Q: What about Pay Codes used for collection (payable)?**  
A: Payable Pay Codes function as **collection references** — similar to how billers already use reference numbers. The payment is executed through existing, regulated channels (QR PH, InstaPay, bank transfers). No new settlement system is created.

**Q: What about Settlement Pay Codes?**  
A: Settlement Pay Codes do not move money themselves. They serve as **settlement references** that anchor institutional transactions (e.g., insurer → hospital). Money moves through existing banking rails. The envelope provides audit infrastructure, not custody.

**Q: Who handles KYC/AML?**  
A: The **issuing and redeeming institutions** (banks, EMIs, insurers). x-Change provides logs, metadata, identity enforcement hooks, and audit trails — but it is not the regulated entity.

**Q: What about cross-border transactions?**  
A: Pay Codes are compatible with cross-border rails via licensed remittance partners. FX settlement occurs at the partner level. x-Change does not perform FX conversion or hold foreign currency.

---

## ❓ FOR BANKS & EMIs

**Q: What value does x-Change provide to financial institutions?**  
A: x-Change gives banks and EMIs three new capabilities through a single integration:
- **Disbursement** — reach unbanked recipients without collecting account details
- **Collection** — accept payments from any wallet/bank via one Pay Code
- **Settlement** — orchestrate complex, evidence-gated institutional transactions

All while preserving institutional control, compliance, and customer relationships.

**Q: Can banks build this themselves?**  
A: The concept appears simple, but the execution involves 50+ database tables, 100+ API endpoints, a composable YAML driver system, a settlement envelope state machine, multi-rail routing, and federation infrastructure. This is a **non-core, high-friction build** for any single institution — and it requires interoperability across institutions, which no single bank can achieve alone.

**Q: Is x-Change an aggregator?**  
A: Think of x-Change as a **scheme** — analogous to Visa or Mastercard. It enforces rules, routes messages, and ensures auditability. Banks retain local control of issuance and settlement. x-Change provides the protocol.

---

## 💼 BUSINESS MODEL

**Q: How does x-Change make money?**  
A: Six revenue streams across three voucher types:

1. **Transaction Fees** — Per Pay Code processed (issuance + redemption/collection/settlement)
2. **Enterprise Licensing** — Annual platform access for institutional partners
3. **Settlement Envelope Fees** — Per-envelope fee for gate-controlled transactions (complexity-based)
4. **Value-Added Services** — Analytics, branded portals, feedback capture
5. **Integration Projects** — One-time onboarding and customization
6. **Float Yield & Breakage** — Share in partner-managed float; unredeemed vouchers

Three voucher types multiply the addressable market from ₱5.6T (disbursement only) to **₱8T+** (disbursement + collection + settlement).

---

## 🔒 DEFENSIBILITY & IP

**Q: What's the real IP?**  
A: The x-Change IP portfolio (patent pending) covers five areas:
1. **Pay Code** — rail-agnostic payment instruction framework (method + system)
2. **Settlement Envelope** — driver-based evidence gating system for conditional settlement
3. **Voucher Orchestration Engine** — programmable issuance, redemption routing, and metadata schema
4. **Driver Composition System** — YAML-based composable workflow configuration with inheritance
5. **Form Flow System** — autonomous multi-step input collection with declarative transformation

All IP is owned by **3neti Research & Development OPC** and exclusively licensed to Open Disbursement Technologies Inc. (ODTI)

**Q: What's the competitive moat?**  
A:
- **Integration moat** — Once embedded with banks and EMIs via federation protocol, switching is costly
- **Network moat** — Value increases with each institution on the scheme (Metcalfe's law)
- **Compliance moat** — Architecture designed for BSP, AMLC, and COA frameworks from day one
- **IP moat** — Patent-pending technology across five distinct invention claims
- **Brand moat** — "Powered by x-Change" becomes a trust signal for institutional-grade Pay Codes

---

## 🎯 The Bottom Line

> Pay Code is not another wallet. It's not another payment app.
>
> It's the **addressing layer** that connects the wallets, banks, and institutions that already exist — with programmable rules, full auditability, and zero lock-in.
>
> Three primitives — **redeemable, payable, settlement** — cover the entire transaction surface.
>
> **Issue now. Transact later. Any channel. Full audit trail.**
