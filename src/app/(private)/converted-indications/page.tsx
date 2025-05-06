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
import { AlertModal } from "@/components/myComponents/AlertModal";

type ProductionProps = {
  propostaId: number;
  dataVigenciaInicial: string;
  dataVigenciaFinal: string;
  tipoLabel: string;
  statusLabel: string;
  ramo: string;
  valorPremio: number;
  valorComissao: number;
  companhia: string;
  nome_produtor: string;
};

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
  sgcorID?: string;
  productionData: ProductionProps;
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
    status: "FECHADO",
    unitId: "CoSpfYYyGeZITlPzEhfg",
    sgcorID: "35636",
    productionData: {
      propostaId: 35636,
      dataVigenciaInicial: "2025-04-16",
      dataVigenciaFinal: "2026-04-16",
      tipoLabel: "Nova",
      statusLabel: "Renovada",
      ramo: "AUTO",
      valorPremio: 1500.0,
      valorComissao: 150.0,
      companhia: "ALLIANZ",
      nome_produtor: "ALEXSANDRO SILVEIRA DE ANDRADE",
    },
  },
  {
    createdAt: "20/04/2025",
    indicator_name: "Maria Fernanda",
    name: "Lucas da Silva Pereira",
    observations: "Cliente indicado via WhatsApp",
    phone: "21988887777",
    product: "VIDA",
    indicationID: "8DHJkqPZtWIoMYbgfKcH",
    status: "FECHADO",
    unitId: "CoSpfYYyGeZITlPzEhfg",
    productionData: {
      propostaId: 36219,
      dataVigenciaInicial: "2025-04-20",
      dataVigenciaFinal: "2026-04-20",
      tipoLabel: "Nova",
      statusLabel: "Vigente",
      ramo: "VIDA",
      valorPremio: 850.0,
      valorComissao: 85.0,
      companhia: "BRADESCO",
      nome_produtor: "CARLA MONTEIRO SANTOS",
    },
  },
  {
    createdAt: "25/04/2025",
    indicator_name: "João Pedro Lima",
    name: "Ana Beatriz Moreira",
    observations: "Contato feito por e-mail, aguarda proposta",
    phone: "11997776666",
    product: "RESIDENCIAL",
    indicationID: "5QFPlnGYhWRoTZfduRjD",
    status: "FECHADO",
    unitId: "CoSpfYYyGeZITlPzEhfg",
    productionData: {
      propostaId: 36542,
      dataVigenciaInicial: "2025-04-25",
      dataVigenciaFinal: "2026-04-25",
      tipoLabel: "Nova",
      statusLabel: "Vigente",
      ramo: "RESIDENCIAL",
      valorPremio: 1200.0,
      valorComissao: 120.0,
      companhia: "PORTO SEGURO",
      nome_produtor: "RODRIGO ALMEIDA COSTA",
    },
  },
  {
    createdAt: "30/04/2025",
    indicator_name: "Fernanda Coutinho",
    name: "Carlos Eduardo Ramos",
    observations: "Cliente com urgência, retorno em aberto",
    phone: "31999998888",
    product: "EMPRESARIAL",
    indicationID: "9ZGKsPLXrUIfqCJsdMxZ",
    status: "FECHADO",
    unitId: "CoSpfYYyGeZITlPzEhfg",
    productionData: {
      propostaId: 36781,
      dataVigenciaInicial: "2025-04-30",
      dataVigenciaFinal: "2026-04-30",
      tipoLabel: "Nova",
      statusLabel: "Vigente",
      ramo: "EMPRESARIAL",
      valorPremio: 5000.0,
      valorComissao: 500.0,
      companhia: "MAPFRE",
      nome_produtor: "LUCIANA PIRES REZENDE",
    },
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
  const [isModalProductionOpen, setIsModalProductionOpen] = useState(false);
  const [productionForIndicationSelected, setProductionForIndicationSelected] =
    useState<IndicationsListProps | null>(null);
    const [AlertModalOpen, setAlertModalOpen] = useState(false)

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
    setValue("sgcorID", indicationSelected.sgcorID ?? "");
  }

  const openProductionInfo = (productionSelected: string) => {
    setIsModalProductionOpen(true);

    const ProductionSelectedParseToNumber = parseInt(productionSelected);
    setProductionForIndicationSelected(
      indicationsList.find(
        (indications) => indications.productionData.propostaId === ProductionSelectedParseToNumber
      ) ?? null
    );
  };

  return (
    <div className="flex h-full w-full overflow-x-auto bg-fifth-purple">
      <main className="flex-1 pt-9 pl-8 pr-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-4 text-[#fff]">Indicações</h1>

        {indicationsList.length > 0 ? (
          <>
            <Card className="h-[92%] overflow-x-auto no-scrollbar">
              <div className="px-4 -mt-2">
                <h2 className="text-xl font-semibold mb-2">Fechadas</h2>
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
                        <th className="px-4 py-2">Produção</th>
                        <th className="px-4 py-2">Final de Vigência</th>
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
                            <Button
                              className="cursor-pointer bg-primary-purple hover:bg-purple-500 transition-all duration-700"
                              type="submit"
                              onClick={() => {
                                if(item.sgcorID && item.sgcorID.length > 0) {
                                  openProductionInfo(item.sgcorID)
                                  console.log('caiu no if')
                                } else {
                                  setAlertModalOpen(true);
                                  console.log('caiu no else')
                                }
                              }}
                            >
                              Ver
                            </Button>
                          </td>
                          <td className="px-4 py-2 space-x-2 text-center">
                            {item.productionData.dataVigenciaFinal}
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

            {/* Modal de Editar indicações da pessoa selecionada */}
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

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sgcorID" className="text-right">
                      SGCOR (ID)
                    </Label>
                    <Input
                      id="sgcorID"
                      className="col-span-3"
                      {...register("sgcorID")}
                    />
                    {errors.sgcorID && <span>{errors.sgcorID.message}</span>}
                  </div>
                </div>
                <DialogFooter>
                  <Button className="cursor-pointer" type="submit">
                    Salvar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>


            {/* Modal da produção vinculada à indicação */}
              <Dialog
                open={isModalProductionOpen}
                onOpenChange={(open) => {
                  setIsModalProductionOpen(open);
                  if (!open) {
                    setProductionForIndicationSelected(null);
                  }
                }}
              >
                <DialogContent
                  className="w-[65%] h-[75%] flex flex-col border-2 border-blue"
                  style={{ maxWidth: "none" } as React.CSSProperties}
                >
                  <DialogHeader>
                    <DialogTitle>
                      Produção ID: {productionForIndicationSelected?.productionData.propostaId}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="overflow-x-auto rounded-2xl flex flex-col">
                    Produtor: {productionForIndicationSelected?.productionData.nome_produtor}
                    Seguradora: {productionForIndicationSelected?.productionData.companhia}
                    Produtor: {productionForIndicationSelected?.productionData.nome_produtor}
                    Produtor: {productionForIndicationSelected?.productionData.nome_produtor}
                  </div>
                </DialogContent>
              </Dialog>
  
              <AlertModal open={AlertModalOpen} setOpen={setAlertModalOpen} title="Produção não vinculada!" description="Você precisa vincular a produção do SGCOR à essa
            indicação para visualizar as informações."/>
          </>
        ) : (
          <Card className="h-[92%] overflow-x-auto no-scrollbar flex justify-center items-center">
            <div className="px-4 -mt-2 ">
              <div className="overflow-x-auto">
                <span className="font-medium">
                  Ainda não há indicações fechadas de sua unidade!
                </span>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
