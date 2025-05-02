"use client";

import React, { use, useActionState, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type IndicationsType = {
  createdAt: string;
  name: string;
  product: string;
  phone: string;
  status: string;
  idProducao: string;
};

interface WithdrawRequestsProps {
  id: number;
  name: string;
  date: string;
  value: number;
  uid: string;
  indications: IndicationsType[];
}

const WithdrawRequests: WithdrawRequestsProps[] = [
  {
    id: 1,
    name: "Walter White",
    uid: "3213123",
    date: "28/04/2025",
    value: 1200.5,
    indications: [
      {
        createdAt: "27/04/2025",
        name: "Saul Goodman",
        product: "Consultoria Jurídica",
        phone: "(11) 98765-4321",
        status: "APROVADO",
        idProducao: "1001",
      },
      {
        createdAt: "28/04/2025",
        name: "Mike Ehrmantraut",
        product: "Segurança",
        phone: "(21) 98888-1122",
        status: "CANCELADO",
        idProducao: "1002",
      },
    ],
  },
  {
    id: 2,
    name: "Jesse Pinkman",
    date: "29/04/2025",
    uid: "321312323",
    value: 750.0,
    indications: [
      {
        createdAt: "29/04/2025",
        name: "Walter White",
        product: "Equipamentos",
        phone: "(33) 99944-2685",
        status: "PENDENTE",
        idProducao: "3111",
      },
    ],
  },
  {
    id: 3,
    uid: "321312",
    name: "Skyler White",
    date: "25/04/2025",
    value: 560.75,
    indications: [
      {
        createdAt: "24/04/2025",
        name: "Ted Beneke",
        product: "Contabilidade",
        phone: "(19) 99999-9988",
        status: "APROVADO",
        idProducao: "4321",
      },
    ],
  },
  {
    id: 4,
    uid: "32131das2323",
    name: "Gustavo Fring",
    date: "30/04/2025",
    value: 2300.0,
    indications: [
      {
        createdAt: "29/04/2025",
        name: "Victor",
        product: "Distribuição",
        phone: "(27) 97777-2233",
        status: "APROVADO",
        idProducao: "5510",
      },
      {
        createdAt: "30/04/2025",
        name: "Tyrus Kitt",
        product: "Logística",
        phone: "(27) 95555-3344",
        status: "PENDENTE",
        idProducao: "5511",
      },
    ],
  },
  {
    id: 5,
    uid: "321312dagr323",
    name: "Hank Schrader",
    date: "26/04/2025",
    value: 890.25,
    indications: [
      {
        createdAt: "25/04/2025",
        name: "Marie Schrader",
        product: "Consultoria",
        phone: "(31) 98888-7766",
        status: "CANCELADO",
        idProducao: "6620",
      },
    ],
  },
];

type ActionType = "approve" | "reject";

export default function WithdrawRequest() {
  const [withdraws, setWithdraws] = useState(WithdrawRequests);
  const [isModalDialogOpen, setIsModalDialogOpen] = useState(false);
  const [isModalIndicationsOpen, setIsModalIndicationsOpen] = useState(false);
  const [userSelectedID, setUserSelectedID] = useState("");
  const [indicationsForUserSelected, setIndicationsForUserSelected] = useState<WithdrawRequestsProps | null>(null)
  const [current, setCurrent] = useState<{
    id: number;
    action: ActionType;
  } | null>(null);

  const openConfirm = (id: number, action: ActionType) => {
    setCurrent({ id, action });
    setIsModalDialogOpen(true);
  };

  const handleConfirm = () => {
    if (!current) return;
    if (current.action === "approve") {
      // TODO: chamar sua função de aprovação, ex: approveitemuest(current.id)
      console.log("aprovando", current.id);
    } else {
      // TODO: chamar sua função de rejeição, ex: rejectitemuest(current.id)
      console.log("rejeitando", current.id);
    }
    setIsModalDialogOpen(false);
  };

  const openIndicationsModal = (userSelected: string) => {
    setUserSelectedID(userSelected);
    setIsModalIndicationsOpen(true);
    console.log("ID:" ,userSelected);

    setIndicationsForUserSelected(
      withdraws.find((withdraws) => withdraws.uid.includes(userSelected)) ?? {}
    );
  };

  console.log("obj", indicationsForUserSelected);

  return (
    <div className="flex h-full w-full overflow-x-auto bg-fifth-purple">
      <main className="flex-1 pt-9 pl-8 pr-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-4 text-[#fff]">Saques</h1>

        {withdraws.length > 0 ? (
          <>
            <Card className="h-[92%] overflow-x-auto no-scrollbar">
              <div className="px-4 -mt-2">
                <h2 className="text-xl font-semibold mb-2">
                  Aprovação de Saques
                </h2>
                <div className="overflow-x-auto rounded-2xl">
                  <table className="min-w-full table-fixed">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Nome</th>
                        <th className="px-4 py-2 text-left">Data</th>
                        <th className="px-4 py-2 text-left">Valor</th>
                        <th className="px-4 py-2">Indicações</th>
                        <th className="px-4 py-2">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdraws.map((item) => (
                        <tr
                          key={item.id}
                          className="even:bg-[#fff] odd:bg-gray-50"
                        >
                          <td className="px-4 py-2 text-[0.9rem]">
                            {item.name}
                          </td>
                          <td className="px-4 py-2 text-[0.9rem]">
                            {item.date}
                          </td>
                          <td className="px-4 py-2 text-[0.9rem]">
                            R$ {item.value}
                          </td>
                          <td className="px-4 py-2 space-x-2 text-center">
                            <Button
                              className="cursor-pointer bg-primary-purple w-18 hover:bg-secondary-lillac transition-all duration-700 text-[0.9rem]"
                              variant="default"
                              size="sm"
                              onClick={() => openIndicationsModal(item.uid)}
                            >
                              Ver
                            </Button>
                          </td>
                          <td className="px-4 py-2 space-x-2 text-center">
                            <Button
                              className="cursor-pointer bg-primary-purple hover:bg-secondary-lillac transition-all duration-700 text-[0.9rem]"
                              variant="default"
                              size="sm"
                              onClick={() => openConfirm(item.id, "approve")}
                            >
                              Aprovar
                            </Button>
                            <Button
                              className="cursor-pointer text-[0.9rem] hover:bg-red-400 transition-all duration-700"
                              variant="destructive"
                              size="sm"
                              onClick={() => openConfirm(item.id, "reject")}
                            >
                              Rejeitar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>

            {/* Modal de Diálogo */}
            <Dialog
              open={isModalDialogOpen}
              onOpenChange={setIsModalDialogOpen}
            >
              <DialogContent className="w-100 border-2 border-blue">
                <DialogHeader>
                  <DialogTitle>Tem certeza?</DialogTitle>
                </DialogHeader>
                <p className="py-4 text-center">
                  Você realmente deseja{" "}
                  <strong
                    className={
                      current?.action === "approve"
                        ? "text-primary-purple"
                        : "text-red"
                    }
                  >
                    {current?.action === "approve" ? "aprovar" : "rejeitar"}
                  </strong>{" "}
                  esta solicitação?
                </p>
                <DialogFooter className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setIsModalDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    className="cursor-pointer bg-primary-purple hover:bg-secondary-lillac transition-all duration-700"
                  >
                    Confirmar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Modal de Indicações */}
            { indicationsForUserSelected?.indications.map(item => (
              <Dialog
              open={isModalIndicationsOpen}
              onOpenChange={(open) => {
                setIsModalIndicationsOpen(open);
                if (!open) {
                  setIndicationsForUserSelected(null);
                }
              }}
            >
              <DialogContent
                className="w-[65%] h-[75%] border-2 border-blue"
                style={{ maxWidth: "none" } as React.CSSProperties}
              >
                <DialogHeader>
                  <DialogTitle>Indicações de {indicationsForUserSelected.name}</DialogTitle>
                </DialogHeader>
                <p className="py-4 text-center">
                  Você realmente deseja{" "}
                  <strong
                    className={
                      current?.action === "approve"
                        ? "text-primary-purple"
                        : "text-red"
                    }
                  >
                    {current?.action === "approve" ? "aprovar" : "rejeitar"}
                  </strong>{" "}
                  esta solicitação?
                </p>
              </DialogContent>
            </Dialog>
            )) }
          </>
        ) : (
          <Card className="h-[92%] overflow-x-auto no-scrollbar flex justify-center items-center">
            <div className="px-4 -mt-2 ">
              <div className="overflow-x-auto">
                <span className="font-medium">
                  Ainda não há solicitações de saque para sua unidade!
                </span>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
