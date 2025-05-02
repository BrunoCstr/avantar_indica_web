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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface AffiliationRequest {
  id: number;
  name: string;
  date: string;
  role: string;
}

const affiliationRequests: AffiliationRequest[] = [
  { id: 1, name: "Ana Silva", date: "30/04/2025", role: "Cliente Indicador" },
  {
    id: 2,
    name: "Bruno Souza",
    date: "29/04/2025",
    role: "Parceiro Indicador",
  },
  { id: 3, name: "Ana Silva", date: "30/04/2025", role: "Cliente Indicador" },
  {
    id: 5,
    name: "Bruno Souza",
    date: "29/04/2025",
    role: "Parceiro Indicador",
  },
  {
    id: 6,
    name: "Bruno Souza",
    date: "29/04/2025",
    role: "Parceiro Indicador",
  },
  {
    id: 7,
    name: "Bruno Souza",
    date: "29/04/2025",
    role: "Parceiro Indicador",
  },
  {
    id: 8,
    name: "Bruno Souza",
    date: "29/04/2025",
    role: "Parceiro Indicador",
  },
  {
    id: 9,
    name: "Bruno Souza",
    date: "29/04/2025",
    role: "Parceiro Indicador",
  },
  {
    id: 10,
    name: "Bruno Souza",
    date: "29/04/2025",
    role: "Parceiro Indicador",
  },
  {
    id: 11,
    name: "Bruno Souza",
    date: "29/04/2025",
    role: "Parceiro Indicador",
  },
  {
    id: 12,
    name: "Bruno Souza",
    date: "29/04/2025",
    role: "Parceiro Indicador",
  },
  {
    id: 13,
    name: "Bruno Souza",
    date: "29/04/2025",
    role: "Parceiro Indicador",
  },
  {
    id: 14,
    name: "Bruno Souza",
    date: "29/04/2025",
    role: "Parceiro Indicador",
  },
  {
    id: 15,
    name: "Bruno Souza",
    date: "29/04/2025",
    role: "Parceiro Indicador",
  },
  {
    id: 16,
    name: "Bruno Souza",
    date: "29/04/2025",
    role: "Parceiro Indicador",
  },
  {
    id: 17,
    name: "Bruno Souza",
    date: "29/04/2025",
    role: "Parceiro Indicador",
  },
];

type ActionType = "approve" | "reject";

export default function MembershipRequests() {
  const [affiliations, setAffiliations] = useState(affiliationRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [current, setCurrent] = useState<{
    id: number;
    action: ActionType;
  } | null>(null);

  const openConfirm = (id: number, action: ActionType) => {
    setCurrent({ id, action });
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (!current) return;
    if (current.action === "approve") {
      // TODO: chamar sua função de aprovação, ex: approveRequest(current.id)
      console.log("aprovando", current.id);
    } else {
      // TODO: chamar sua função de rejeição, ex: rejectRequest(current.id)
      console.log("rejeitando", current.id);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-full w-full overflow-x-auto bg-fifth-purple">
      <main className="flex-1 pt-9 pl-8 pr-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-4 text-[#fff]">Afiliações</h1>

        {/* Afiliação */}
        <Card className="h-[92%] overflow-x-auto no-scrollbar">
          <div className="px-4 -mt-2">
            <h2 className="text-xl font-semibold mb-2">
              Aprovação de Afiliações
            </h2>
            <div className="overflow-x-auto rounded-2xl">
              <table className="min-w-full table-fixed">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Nome</th>
                    <th className="px-4 py-2 text-left">Data</th>
                    <th className="px-4 py-2 text-left">Regra</th>
                    <th className="px-4 py-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliations.map((req) => (
                    <tr key={req.id} className="even:bg-[#fff] odd:bg-gray-50">
                      <td className="px-4 py-2">{req.name}</td>
                      <td className="px-4 py-2">{req.date}</td>
                      <td className="px-4 py-2">
                        <Select defaultValue={req.role}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione regra" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Cliente Indicador">
                              Cliente Indicador
                            </SelectItem>
                            <SelectItem value="Parceiro Indicador">
                              Parceiro Indicador
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-2 space-x-2 text-center">
                        <Button
                          className="cursor-pointer bg-primary-purple hover:bg-secondary-lillac transition-all duration-700"
                          variant="default"
                          size="sm"
                          onClick={() => openConfirm(req.id, 'approve')}
                        >
                          Aprovar
                        </Button>
                        <Button
                          className="cursor-pointer hover:bg-red-400 transition-all duration-700"
                          variant="destructive"
                          size="sm"
                          onClick={() => openConfirm(req.id, 'reject')}
                        >
                          Rejeitar
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {/* diálogo de confirmação */}
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="w-100 border-2 border-blue">
                      <DialogHeader>
                        <DialogTitle>Tem certeza?</DialogTitle>
                      </DialogHeader>
                      <p className="py-4 text-center">
                        Você realmente deseja{" "}
                        <strong className={current?.action === "approve" ? 'text-primary-purple' : 'text-red'}>
                          {current?.action === "approve"
                            ? "aprovar"
                            : "rejeitar"}
                        </strong>{" "}
                        esta solicitação?
                      </p>
                      <DialogFooter className="flex justify-end space-x-2">
                        <Button
                          variant='outline'
                          className="cursor-pointer"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleConfirm} className="cursor-pointer bg-primary-purple hover:bg-secondary-lillac transition-all duration-700">Confirmar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
