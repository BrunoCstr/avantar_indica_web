'use client';

import { useEffect, useState } from "react";
import { db } from "../lib/firebaseConfig";
import {
  collection,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";
import { useAuth } from "../context/Auth";

type KPIsData = {
  value: number;
  loading: boolean;
};

interface DashboardKPIs {
  indicationsOfMonth: KPIsData;
  indicationsOfYear: KPIsData;
  requestsAffiliation: KPIsData;
  totalLeadsConverted: KPIsData;
  totalCommissionGenerated: KPIsData;
  leadsAwaitingContact: KPIsData;
  withdrawalsMade: KPIsData;
}

export function useDashboardData() {
  const { userData } = useAuth();
  const unitId = userData?.unitId;

  const [kpis, setKpis] = useState<DashboardKPIs>({
    indicationsOfMonth: { value: 0, loading: true },
    indicationsOfYear: { value: 0, loading: true },
    requestsAffiliation: { value: 0, loading: true },
    totalLeadsConverted: { value: 0, loading: true },
    totalCommissionGenerated: { value: 0, loading: true },
    leadsAwaitingContact: { value: 0, loading: true },
    withdrawalsMade: { value: 0, loading: true },
  });

  const fetchKPIs = async (KPIs: string) => {
    if (!unitId) return 0;

    let now = new Date();
    let q;

    try {
      switch (KPIs) {
        case "indicationsOfMonth":
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const startOfNextMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
          );

          const ref = collection(db, "indications");
          q = query(
            ref,
            where("unitId", "==", unitId),
            where("createdAt", ">=", startOfMonth),
            where("createdAt", "<", startOfNextMonth)
          );
          const snapshot = await getCountFromServer(q);
          return snapshot.data().count;

        case "indicationsOfYear":
          const monthlyCountsIndications: number[] = [];

          for (let month = 0; month < 12; month++) {
            const startOfMonth = new Date(now.getFullYear(), month, 1);
            const endOfMonth = new Date(now.getFullYear(), month + 1, 1);

            const monthlyRef = collection(db, "indications");
            const monthlyQuery = query(
              monthlyRef,
              where("unitId", "==", unitId),
              where("createdAt", ">=", startOfMonth),
              where("createdAt", "<", endOfMonth)
            );
            const monthlySnapshot = await getCountFromServer(monthlyQuery);
            monthlyCountsIndications.push(monthlySnapshot.data().count);
          }

        case "requestsAffiliation":
          const monthlyCountsRequestsAf: number[] = [];
          for (let month = 0; month < 12; month++) {
            const startOfMonth = new Date(now.getFullYear(), month, 1);
            const endOfMonth = new Date(now.getFullYear(), month + 1, 1);

            const monthlyRef = collection(db, "users");
            const monthlyQuery = query(
              monthlyRef,
              where("unitId", "==", unitId),
              where("createdAt", ">=", startOfMonth),
              where("createdAt", "<", endOfMonth)
            );
            const monthlySnapshot = await getCountFromServer(monthlyQuery);
            monthlyCountsRequestsAf.push(monthlySnapshot.data().count);
          }

        case "totalLeadsConverted":
          const leadsRef = collection(db, "indications");
          q = query(
            leadsRef,
            where("unitId", "==", unitId),
            where("status", "==", "FECHADO")
          );
          const leadsSnapshot = await getCountFromServer(q);
          return leadsSnapshot.data().count;

        case "totalCommissionGenerated":
          // Lógica para consultar produções no SGCOR
          return 500.0;

        case "leadsAwaitingContact":
          const leadsAwaitingRef = collection(db, "indications");
          q = query(
            leadsAwaitingRef,
            where("unitId", "==", unitId),
            where("status", "==", "PENDENTE CONTATO")
          );
          const leadsAwaitingSnapshot = await getCountFromServer(q);
          return leadsAwaitingSnapshot.data().count;

        case "withdrawalsMade":
          const withdrawalsRef = collection(db, "withdrawals");
          q = query(
            withdrawalsRef,
            where("unitId", "==", unitId),
            where("status", "==", "CONCLUIDO")
          );
          const withdrawalsSnapshot = await getCountFromServer(q);
          return withdrawalsSnapshot.data().count;

        default:
          return 0;
      }
    } catch (err) {
      console.error("Error fetching KPIs:", err);
      return 0;
    }
  };

  const fetchAllKPIs = async () => {
    setKpis((prev) => ({
      ...prev,
    }));

    const indicationsOfMonth = await fetchKPIs("indicationsOfMonth");
    const indicationsOfYear = await fetchKPIs("indicationsOfYear");
    const requestsAffiliation = await fetchKPIs("requestsAffiliation");
    const totalLeadsConverted = await fetchKPIs("totalLeadsConverted");
    const totalCommissionGenerated = await fetchKPIs(
      "totalCommissionGenerated"
    );
    const leadsAwaitingContact = await fetchKPIs("leadsAwaitingContact");
    const withdrawalsMade = await fetchKPIs("withdrawalsMade");

    setKpis({
      indicationsOfMonth: { value: indicationsOfMonth, loading: false },
      indicationsOfYear: { value: indicationsOfYear, loading: false },
      requestsAffiliation: { value: requestsAffiliation, loading: false },
      totalLeadsConverted: { value: totalLeadsConverted, loading: false },
      totalCommissionGenerated: {
        value: totalCommissionGenerated,
        loading: false,
      },
      leadsAwaitingContact: { value: leadsAwaitingContact, loading: false },
      withdrawalsMade: { value: withdrawalsMade, loading: false },
    });
  };

  useEffect(() => {
    if (unitId) {
      fetchAllKPIs();
    }
  }, [unitId]);

  return kpis;
}
