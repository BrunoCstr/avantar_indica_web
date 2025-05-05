"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdEdit } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editIndicationSchema,
  EditIndicationFormData,
} from "@/app/schemas/validationForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

interface IndicationsListProps {
  createdAt: string;
  indicator_name: string;
  name: string;
  observations: string;
  phone: string;
  product: string;
  indicationID: string;
  status: string;
  unitId: string;
}

const indicationsList: IndicationsListProps[] = [
  {
    createdAt: "16/04/2025",
    indicator_name: "Vasco da Gama",
    name: "Bruno de Castro Rocha Leles",
    observations: "123 teste, 123",
    phone: "33999442685",
    product: "AUTO",
    indicationID: "2CDJkbOYzHAIcWYfeXbJ",
    status: "PENDENTE CONTATO",
    unitId: "CoSpfYYyGeZITlPzEhfg",
  },
  {
    createdAt: "18/04/2025",
    indicator_name: "Maria da Silva",
    name: "João Pedro Carvalho",
    observations: "Interessado em seguro residencial.",
    phone: "21987654321",
    product: "RESIDENCIAL",
    indicationID: "9AHJdlKUzXABpLWffEjW",
    status: "CONTATO REALIZADO",
    unitId: "CoSpfYYyGeZITlPzEhfg",
  },
  {
    createdAt: "20/04/2025",
    indicator_name: "Lucas Andrade",
    name: "Fernanda Oliveira Ramos",
    observations: "Cliente já possui apólice vencida.",
    phone: "31988441234",
    product: "VIDA",
    indicationID: "4LKJzvJTyQPnbOEksWmP",
    status: "PENDENTE CONTATO",
    unitId: "CoSpfYYyGeZITlPzEhfg",
  },
  {
    createdAt: "22/04/2025",
    indicator_name: "Juliana Moreira",
    name: "Carlos Eduardo Fernandes",
    observations: "Quer cotação para dois veículos.",
    phone: "11997443322",
    product: "AUTO",
    indicationID: "7DKFzqOXbRMIgTJhvVnL",
    status: "PROPOSTA ENVIADA",
    unitId: "CoSpfYYyGeZITlPzEhfg",
  },
  {
    createdAt: "24/04/2025",
    indicator_name: "Pedro Henrique",
    name: "Amanda Costa Lima",
    observations: "Cliente indicada por irmã.",
    phone: "21991234567",
    product: "SAÚDE",
    indicationID: "8GLKxqMNvSTUgPWhcCkB",
    status: "AGUARDANDO DOCUMENTOS",
    unitId: "CoSpfYYyGeZITlPzEhfg",
  },
];

const indicationStatus = [
  "PENDENTE CONTATO",
  "CONTATO REALIZADO",
  "NÃO INTERESSOU",
  "INICIO DE PROPOSTA",
  "PROPOSTA APRESENTADA",
  "AGUARDANDO CLIENTE",
  "FECHADO",
  "NÃO FECHADO",
  "SEGURO RECUSADO",
];

type ActionType = "approve" | "reject";

export default function OngoingIndications() {
  const [indications, setIndications] = useState(indicationsList);
  const [isModalDialogOpen, setIsModalDialogOpen] = useState(false);
  const [isModalIndicationsOpen, setIsModalIndicationsOpen] = useState(false);
  const [indicationSelectedID, setIndicationID] = useState("");
  const [indicationSelected, setIndicationSelected] =
    useState<IndicationsListProps | null>(null);
  const [current, setCurrent] = useState<{
    id: number;
    action: ActionType;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<EditIndicationFormData>({
    resolver: zodResolver(editIndicationSchema),
    defaultValues: {
      product: "",
      phone: "",
      status: "",
    },
  });

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

  const openEditIndicationModal = (indicationSelected: string) => {
    setIndicationID(indicationSelected);
    setIsModalIndicationsOpen(true);
    console.log("ID:", indicationSelected);

    setIndicationSelected(
      indications.find(
        (indications) => indications.indicationID === indicationSelected
      ) ?? null
    );
  };

  if (indicationSelected) {
    setValue("product", indicationSelected.product);
    setValue("phone", indicationSelected.phone);
    setValue("status", indicationSelected.status);
  }

  return (
    <div className="flex h-full w-full overflow-x-auto bg-fifth-purple">
      <main className="flex-1 pt-9 pl-8 pr-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-4 text-[#fff]">Indicações</h1>

        {indicationsList.length > 0 ? (
          <>
            <Card className="h-[92%] overflow-x-auto no-scrollbar">
              <div className="px-4 -mt-2">
                <h2 className="text-xl font-semibold mb-2">
                  Indicações Recebidas
                </h2>
                <div className="overflow-x-auto rounded-2xl">
                  <table className="min-w-full table-fixed">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Editar</th>
                        <th className="px-4 py-2 text-left">Nome</th>
                        <th className="px-4 py-2 text-left">Indicado por</th>
                        <th className="px-4 py-2 text-left">Produto</th>
                        <th className="px-4 py-2 text-left">Telefone</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {indications.map((item) => (
                        <tr
                          key={item.indicationID}
                          className="even:bg-[#fff] odd:bg-gray-50"
                        >
                          <td className="px-4 py-2">
                            <MdEdit
                              className="cursor-pointer"
                              onClick={() =>
                                openEditIndicationModal(item.indicationID)
                              }
                              size={20}
                            />
                          </td>
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2">{item.indicator_name}</td>
                          <td className="px-4 py-2">{item.product}</td>
                          <td className="px-4 py-2 space-x-2 text-center">
                            <div className="flex flex-row items-center gap-2">
                              <FaWhatsapp
                                className="cursor-pointer"
                                size={20}
                                onClick={() => {
                                  window.open(
                                    `https://wa.me/55${item.phone}`,
                                    "_blank"
                                  );
                                }}
                              />{" "}
                              {item.phone}
                            </div>
                          </td>
                          <td
                            className={`px-4 py-2 ${
                              item.status === "PENDENTE CONTATO"
                                ? "text-orange"
                                : item.status === "FECHADO"
                                ? "text-green"
                                : item.status === "SEGURO RECUSADO" ||
                                  item.status === "NÃO FECHADO"
                                ? "text-red"
                                : "text-[#000000]"
                            } space-x-2`}
                          >
                            {item.status}
                          </td>
                          <td className="px-4 py-2 space-x-2 text-center">
                            {item.createdAt}
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

            {/* Modal de Indicações da pessoa selecionada */}
            <Dialog
              open={isModalIndicationsOpen}
              onOpenChange={(open) => {
                setIsModalIndicationsOpen(open);
                if (!open) {
                  setIndicationSelected(null);
                }
              }}
            >
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Editar indicação</DialogTitle>
                  <DialogDescription>
                    Faça alterações na indicação selecionada. Clique em "Salvar"
                    quando terminar.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product" className="text-right">
                      Produto
                    </Label>
                    <Input
                      id="product"
                      className="col-span-3"
                      {...register("product")}
                    />
                    {errors.product && <span>{errors.product.message}</span>}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Telefone
                    </Label>
                    <Input
                      id="phone"
                      className="col-span-3"
                      {...register("phone")}
                    />
                    {errors.phone && <span>{errors.phone.message}</span>}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full col-span-3">
                            <SelectValue placeholder="Selecione um Status" />
                          </SelectTrigger>
                          <SelectContent>
                            {indicationStatus.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      rules={{ required: "Selecione um status!" }}
                    />
                    {errors.status && <span>{errors.status.message}</span>}
                  </div>
                </div>
                <DialogFooter>
                  <Button className="cursor-pointer" type="submit">
                    Salvar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
