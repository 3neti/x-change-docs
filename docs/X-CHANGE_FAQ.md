# x-Change: Comprehensive FAQ

## ❓WHO

**Q: Who is this for?**  
A: x-Change serves **institutions** (banks, EMIs, lenders, NGOs, money changers, LGUs) that need to disburse funds without pre-collecting bank details. Recipients benefit by choosing when and where to receive the funds.

**Q: Who controls the funds?**  
A: The **issuer institution** does. Funds are held in escrow until redeemed. Every voucher has traceable metadata and can include usage conditions (expiry, destination rules, etc.).

**Q: Who handles identity verification?**  
A: KYC and AML are enforced at **redemption**, not issuance. Redemption may require account ownership proof or validation via partner institutions.

---

## ❓WHAT

**Q: What is x-Change?**  
A: A programmable **voucher engine and escrow layer** that enables pull-based redemption of funds via QR code, SMS code, or printed token.

**Q: What makes this different from GCash, Maya, or direct bank transfers?**  
A: Traditional systems are **push-based**: the sender decides the destination account. x-Change is **pull-based**: the recipient chooses. This provides flexibility and decouples disbursement from recipient readiness.

**Q: Is this a cryptocurrency or blockchain product?**  
A: No. This is **not** crypto, blockchain, or stablecoin-based. Funds are held in **fiat currency**, inside **regulated financial institutions**.

---

## ❓WHEN

**Q: When is x-Change useful?**  
A: When the sender:
- Doesn’t have the recipient’s full account details
- Needs to disburse funds to **a group with variable readiness**
- Wants to offer **cash-like flexibility** with **digital traceability**
- Operates in **offline, print-first, or low-tech settings**

**Q: Can vouchers expire or be revoked?**  
A: Yes. Issuers can set expiry dates, auto-cancellation windows, redemption conditions, or revoke vouchers manually.

---

## ❓WHERE

**Q: Where can the recipient redeem the voucher?**  
A: At any supported endpoint:
- e-Wallets (e.g., GCash, Maya)
- Banks (BDO, RCBC, etc.)
- Over-the-counter partners (rural banks, pawnshops, cash agents)
- Other regulated payout channels

**Q: Where are the funds held before redemption?**  
A: In the wallet or account of the **licensed issuer** (not x-Change). We do not hold or transmit funds directly.

---

## ❓WHY

**Q: Why not just send the money directly?**  
A: Because direct transfers assume:
- You know the recipient's full bank or wallet details
- The recipient is ready to receive it now
- There's a trusted channel already

In many cases, those assumptions fail. x-Change solves this by **decoupling the disbursement** from the redemption—while still preserving control and traceability.

**Q: Why is this better than handing out cash?**  
A: Because it’s:
- Traceable
- Programmable (limits, expiry, audit)
- Redeemable anytime
- Still feels familiar for unbanked recipients

**Q: Why would regulators approve this model?**  
A: Because redemption always passes through **licensed financial entities**, with full audit trails, source metadata, and configurable compliance thresholds. It’s **more controlled than peer-to-peer transfers**.

---

## ❓HOW

**Q: How does the system work?**  
A: At a high level:
1. Institution escrows funds into a ledger or wallet
2. x-Change generates a voucher (QR or SMS code)
3. Recipient receives and later redeems the voucher
4. Upon redemption, the funds are routed to their chosen, validated destination

**Q: Can issuers control where it gets redeemed?**  
A: Yes. Redemption rules can be defined:
- Specific destinations only (e.g., GCash, rural banks)
- Only during business hours
- Only by recipients passing identity checks

**Q: What if someone steals or misuses a voucher?**  
A: Vouchers can:
- Require validation before redemption
- Be linked to mobile or PIN
- Be revoked before use
- Be limited in amount, expiration, or redemption attempts

---

## ❓REGULATION & LICENSING

**Q: Does x-Change require a special BSP license?**  
A: No, **not as a tech provider**. We operate under the regulatory perimeter of our **licensed clients** (EMIs, banks, etc.).

We don’t:
- Custody funds
- Transmit money
- Represent ourselves as a financial institution

We **provide infrastructure**—issuance engines, redemption portals, metadata logs—that licensed institutions use within their own compliance frameworks.

**Q: So why are cross-border features sensitive?**  
A: Cross-border transfers can trigger:
- Foreign exchange regulations (conversion of PHP to USD, etc.)
- Licensing in other jurisdictions (as a remittance service or MSB)
- Heightened AML scrutiny

To stay within safe regulatory bounds, x-Change currently **does not offer or promote cross-border redemption**. All operations remain **within the Philippines** and under local supervision.

**Q: Who is responsible for AML/CFT compliance?**  
A: The **issuing and redeeming institutions** (our clients). We provide logs, metadata, expiry controls, tagging, and risk-based features—but we are **not the regulated entity**.

---

## ❓WHY DO BANKS & EMIs PARTNER WITH x-CHANGE?

**Q: What value does x-Change provide to financial institutions?**  
A: x-Change gives banks, EMIs, and financial service providers a **disbursement layer that goes beyond their app**. They can now serve:
- Unbanked or app-less recipients
- Informal segments (OTC, cash-first)
- Clients without prior account registration
- Mass payouts without full KYC collection upfront

We help them **reach new markets, improve redemption flexibility, and offer programmable money rails**—with minimal dev effort.

**Q: Aren’t banks capable of building this themselves?**  
A: In theory, yes. But in practice, it’s a **non-core, high-friction build**. We let them:
- Go to market faster
- Avoid fragmented integrations (GCash, rural banks, agents, etc.)
- Get audit, compliance, and logging built-in

**Q: So you're an aggregator or bridge?**  
A: Think of us as their **account-agnostic payout abstraction layer**—we unify the rails and redemption flows. They issue. We route.

---

## 💼 HOW DOES x-CHANGE MAKE MONEY?

**Q: What’s your business model?**  
A: We have 3 primary revenue streams:

1. **Licensing Fees**
    - For enterprise access to the voucher engine, APIs, portals, and integrations.

2. **Redemption Margin**
    - We earn a **small cut per transaction** (e.g., Instapay, PesoNet, OTC rails) via margin-sharing with issuer or partner.

3. **Programmability Add-ons**
    - We charge for advanced features:
        - Expiry dates
        - Geo-locking or channel-specific rules
        - Bulk issuance or API automations
        - White-label portals or branded vouchers

This model aligns with financial institutions: **they retain control, earn more, and reach farther—with our tools.**

---

## 🔒 WHAT STOPS OTHERS FROM COPYING THIS?

**Q: Isn’t this easy to replicate once big players see it?**  
A: The concept looks simple—but the execution is not. x-Change manages the **entire programmable disbursement lifecycle**, including:
- Secure escrow control
- Voucher metadata generation and validation
- Dynamic redemption routing across multiple rails
- Fraud prevention, expiry enforcement, and double-spend protection
- Partner-specific reconciliation and audit trails

These are not one-off features—they form a **coordinated, policy-driven engine** that’s deeply integrated with financial systems and compliance layers.

**Q: What’s your real IP?**  
A: Our **voucher orchestration engine**, **metadata schema**, and **routing logic**—the invisible layer that connects regulated rails, enforces voucher rules, and ensures traceable redemption. It’s the glue that makes the model scalable, auditable, and regulator-ready.

**Q: What’s your moat?**  
A:
- **Integration moat:** Once we’re embedded with banks and EMIs, switching is costly.
- **Compliance moat:** Our architecture is designed to fit BSP and AMLC frameworks.
- **Brand moat:** The “Powered by x-Change” mark becomes a trust signal for safe, redeemable digital cash.

---

## 🎯 Final Punchline

> “Sending money directly works **when you know who you’re sending to, what account, and when**.
>
> But in the real world—where recipients change wallets, lose access, or are offline—that’s not always the case.
>
> x-Change flips the model: issue now, redeem later, anywhere.
>
> **Programmable. Account-agnostic. Traceable. Cash-like—but digital.**”
