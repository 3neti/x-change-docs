## **Appendix C – Regulatory & Compliance Checklist**

### **C.1 Regulatory Framework Overview**
- Summary of Philippine financial-technology regulatory landscape
    - Bangko Sentral ng Pilipinas (BSP)
    - Anti-Money Laundering Council (AMLC)
    - National Privacy Commission (NPC) under the Data Privacy Act (RA 10173)
- Scope of x‑Change operations under partner Electronic Money Issuer (EMI) and Open Finance arrangements
- Applicable laws and circulars (e.g., BSP Circulars 649, 944, 1108, 1122, 1160; RA 9160 as amended; RA 10173)

---

### **C.2 Licensing and Partnership Structure**
- Regulatory perimeter statement *(x‑Change is a technology infrastructure provider; funds remain with licensed EMIs/banks)*
- Partner EMI / bank license references and service descriptions
- API and service‑level alignment with partners’ BSP‑approved activities and program documents
- Roles and responsibilities matrix *(issuer / EMI, disbursement partner, technology provider)*

---

### **C.3 BSP Compliance Mapping**
| Area | Requirement | Reference | Responsible Entity | Compliance Status |
|------|-------------|-----------|--------------------|-------------------|
| e‑Money Regulations | Customer fund segregation; float management | BSP Circular 649 | Partner EMI | ✅ Implemented |
| Outsourcing & Third‑Party Risk | Technology outsourcing approval; risk assessment; performance monitoring | BSP Circular 1122 | Partner EMI / x‑Change | ⬜ In Progress |
| Open Finance Framework | Consent management; standardized APIs; data portability | BSP Circular 1122 | x‑Change | ⬜ In Progress |
| Consumer Protection Standards | Disclosures; complaint handling; fair treatment | BSP Circular 1160 | x‑Change / Partner | ✅ Implemented |
| IT Risk Management | Information security; BCP/DRP; incident reporting | BSP Circular 808 (as amended) | x‑Change / Partner | ⬜ Planned |

> Notes: Replace statuses as controls move through design → implementation → audit.

---

### **C.4 AMLC / e‑KYC Alignment**
- KYC & Customer Due Diligence executed through partner EMI/bank (policy, CIP, risk scoring)
- Ongoing transaction monitoring and suspicious‑activity reporting (STR/CTR) handled by licensed partners
- Record‑retention and audit‑trail policies aligned with AMLA and partner standards
- Integration of Hyperverge eKYC for ID/selfie validation; liveliness checks prior to voucher issuance

---

### **C.5 Data Privacy and Security**
- PDPA principles applied *(transparency, proportionality, legitimate purpose)* with privacy notices and DSAR handling
- Data‑sharing agreements and joint‑controller/processor delineation with partners
- Data Protection Officer (DPO) designation and privacy impact assessments for major features
- Retention & deletion schedule mapped to business purpose and regulatory timelines
- Identity & Access via **WorkOS** (SSO, MFA, RBAC); encryption in transit (TLS 1.3) and at rest (AES‑256); centralized logging (SIEM)

---

### **C.6 Operational Controls and Audit**
- Internal control framework mapped to BSP, AMLC, and PDPA requirements
- Periodic third‑party IT/security audits and penetration testing; remediation tracking
- Incident response (IR) playbooks: severity tiers, 24×7 escalation, regulatory notification windows
- Compliance calendar with owners and cadence (monthly monitoring, quarterly testing, annual audits)

---

### **C.7 Open Finance and Interoperability**
- API standards and data schema aligned with BSP Open Finance Framework tiers
- Consent lifecycle (grant, scope, expiry, revocation) with auditable logs
- Interoperability testing with partner EMIs, banks, wallets; sandbox certification and versioning policy

---

### **C.8 Summary and Next Steps**
- Compliance status snapshot *(green/yellow/red)* per control domain
- Upcoming regulatory filings/approvals and partner attestations
- Continuous improvement plan: quarterly control reviews, KPI/KRI dashboard, and board reporting
