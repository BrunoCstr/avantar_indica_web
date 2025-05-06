// src/hooks/useDashboardData.ts

import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getCountFromServer, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

type IndicatorData = {
  value: number;
  loading: boolean;
};

type DashboardIndicators = {
  indicationsOfMonth: IndicatorData;
  totalLeadsConverted: IndicatorData;
  totalCommissionGenerated: IndicatorData;
  leadsAwaitingContact: IndicatorData;
  withdrawalsMade: IndicatorData;
};

export function useDashboardData() {
  const { userData } = useAuth();
  const unidadeId = userData?.unidadeId;

  const [indicators, setIndicators] = useState<DashboardIndicators>({
    indicationsOfMonth: { value: 0, loading: true },
    totalLeadsConverted: { value: 0, loading: true },
    totalCommissionGenerated: { value: 0, loading: true },
    leadsAwaitingContact: { value: 0, loading: true },
    withdrawalsMade: { value: 0, loading: true },
  });

  const fetchIndicator = async (indicator: string) => {
    if (!unidadeId) return;

    let q;

    switch (indicator) {
      case 'indicationsOfMonth':
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const ref = collection(db, 'indications');
        q = query(
          ref,
          where('unidadeId', '==', unidadeId),
          where('createdAt', '>=', startOfMonth),
          where('createdAt', '<', startOfNextMonth)
        );
        const snapshot = await getCountFromServer(q);
        return snapshot.data().count;

      case 'totalLeadsConverted':
        // Consulta total de leads convertidos (com status "FECHADO")
        const leadsRef = collection(db, 'indications');
        q = query(
          leadsRef,
          where('unidadeId', '==', unidadeId),
          where('status', '==', 'FECHADO')
        );
        const leadsSnapshot = await getCountFromServer(q);
        return leadsSnapshot.data().count;

      case 'totalCommissionGenerated':
        // Aqui você teria uma lógica de integração com a API do SGCOR
        // Por exemplo, fazendo uma requisição HTTP
        return 5000; // Exemplo estático de comissão gerada

      case 'leadsAwaitingContact':
        const awaitingRef = collection(db, 'indications');
        q = query(
          awaitingRef,
          where('unidadeId', '==', unidadeId),
          where('status', '==', 'PENDENTE CONTATO')
        );
        const awaitingSnapshot = await getCountFromServer(q);
        return awaitingSnapshot.data().count;

      case 'withdrawalsMade':
        // Consulta de saques feitos (exemplo)
        const withdrawalsRef = collection(db, 'withdrawals');
        q = query(
          withdrawalsRef,
          where('unidadeId', '==', unidadeId),
          where('status', '==', 'APROVADO')
        );
        const withdrawalsSnapshot = await getCountFromServer(q);
        return withdrawalsSnapshot.data().count;

      default:
        return 0;
    }
  };

  const fetchAllIndicators = async () => {
    setIndicators((prevState) => ({
      ...prevState,
      indicationsOfMonth: { ...prevState.indicationsOfMonth, loading: true },
      totalLeadsConverted: { ...prevState.totalLeadsConverted, loading: true },
      totalCommissionGenerated: { ...prevState.totalCommissionGenerated, loading: true },
      leadsAwaitingContact: { ...prevState.leadsAwaitingContact, loading: true },
      withdrawalsMade: { ...prevState.withdrawalsMade, loading: true },
    }));

    const indicationsOfMonth = await fetchIndicator('indicationsOfMonth');
    const totalLeadsConverted = await fetchIndicator('totalLeadsConverted');
    const totalCommissionGenerated = await fetchIndicator('totalCommissionGenerated');
    const leadsAwaitingContact = await fetchIndicator('leadsAwaitingContact');
    const withdrawalsMade = await fetchIndicator('withdrawalsMade');

    setIndicators({
      indicationsOfMonth: { value: indicationsOfMonth, loading: false },
      totalLeadsConverted: { value: totalLeadsConverted, loading: false },
      totalCommissionGenerated: { value: totalCommissionGenerated, loading: false },
      leadsAwaitingContact: { value: leadsAwaitingContact, loading: false },
      withdrawalsMade: { value: withdrawalsMade, loading: false },
    });
  };

  useEffect(() => {
    if (unidadeId) {
      fetchAllIndicators();
    }
  }, [unidadeId]);

  return indicators;
}

const monthlyCounts: number[] = [];

for (let month = 0; month < 12; month++) {
  const start = new Date(now.getFullYear(), month, 1);
  const end = new Date(now.getFullYear(), month + 1, 1);

  const monthQuery = query(
    collection(db, "indications"),
    where("unitId", "==", unitId),
    where("createdAt", ">=", start),
    where("createdAt", "<", end)
  );

  const snapshot = await getCountFromServer(monthQuery);
  monthlyCounts.push(snapshot.data().count);
}

