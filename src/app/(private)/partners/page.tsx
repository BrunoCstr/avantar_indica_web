"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdEdit } from "react-icons/md";
import { EditUserFormData, editUserSchema } from "@/app/schemas/validationForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface PartnersProps {
  email: string;
  fullName: string;
  phone: string;
  pixKey: string | null;
  rule: string;
  uid: string;
  indications: number;
}

const affiliationRequests: PartnersProps[] = [
  {
    email: "brunocastro@avantar.com.br",
    fullName: "Bruno de Castro Rocha Leles",
    phone: "33999442685",
    pixKey: "brunocrl123@hotmail.com",
    rule: "Cliente Indicador",
    uid: "5mUxScr6JBbluLbNI6IYZ4FthdH3",
    indications: 4,
  },
  {
    email: "amanda.silva@avantar.com.br",
    fullName: "Amanda Silva Oliveira",
    phone: "31999887766",
    pixKey: "amandasilva@pix.com",
    rule: "Parceiro Indicador",
    uid: "a1B2c3D4e5F6g7H8i9J0",
    indications: 8,
  },
  {
    email: "lucas.mendes@avantar.com.br",
    fullName: "Lucas Mendes Ferreira",
    phone: "31988776655",
    pixKey: "lucasmf123@gmail.com",
    rule: "Cliente Indicador",
    uid: "k9L8m7N6o5P4q3R2s1T0",
    indications: 10,
  },
  {
    email: "julia.pereira@avantar.com.br",
    fullName: "Júlia Pereira Lima",
    phone: "31997766554",
    pixKey: "juliaplima@hotmail.com",
    rule: "Parceiro Indicador",
    uid: "u1V2w3X4y5Z6a7B8c9D0",
    indications: 90,
  },
  {
    email: "marcos.souza@avantar.com.br",
    fullName: "Marcos Souza Andrade",
    phone: "31996655443",
    pixKey: "msouza@pix.com.br",
    rule: "Cliente Indicador",
    uid: "e3F4g5H6i7J8k9L0m1N2",
    indications: 1,
  },
  {
    email: "fernanda.gomes@avantar.com.br",
    fullName: "Fernanda Gomes Ribeiro",
    phone: "31995544332",
    pixKey: "fernandaribeiro@pix.me",
    rule: "Parceiro Indicador",
    uid: "o9P8q7R6s5T4u3V2w1X0",
    indications: 0,
  },
  {
    email: "rafael.almeida@avantar.com.br",
    fullName: "Rafael Almeida Costa",
    phone: "31994433221",
    pixKey: "ralmeida@pixmail.com",
    rule: "Cliente Indicador",
    uid: "y5Z6a7B8c9D0e1F2g3H4",
    indications: 65,
  },
  {
    email: "carla.martins@avantar.com.br",
    fullName: "Carla Martins Rocha",
    phone: "31993322110",
    pixKey: "cmrocha@hotmail.com",
    rule: "Parceiro Indicador",
    uid: "i7J8k9L0m1N2o3P4q5R6",
    indications: 24,
  },
  {
    email: "danilo.ferreira@avantar.com.br",
    fullName: "Danilo Ferreira Luz",
    phone: "31992211009",
    pixKey: "daniloferreira@pix.com",
    rule: "Cliente Indicador",
    uid: "s5T4u3V2w1X0y1Z2a3B4",
    indications: 44,
  },
  {
    email: "sabrina.torres@avantar.com.br",
    fullName: "Sabrina Torres Melo",
    phone: "31991100998",
    pixKey: "sabrinatorres@pixmail.com",
    rule: "Parceiro Indicador",
    uid: "c9D0e1F2g3H4i5J6k7L8",
    indications: 14,
  },
  {
    email: "felipe.cardoso@avantar.com.br",
    fullName: "Felipe Cardoso Braga",
    phone: "31990099887",
    pixKey: "felipecardoso@pix.com.br",
    rule: "Cliente Indicador",
    uid: "m1N2o3P4q5R6s7T8u9V0",
    indications: 5,
  },
];

type ActionType = "approve" | "reject";

export default function Partners() {
  const [partners, setPartners] = useState(affiliationRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [partnerSelected, setPartnerSelected] = useState<PartnersProps | null>(
    null
  );
  const [partnerUID, setPartnetUID] = useState("");
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const [current, setCurrent] = useState<{
    id: string;
    action: ActionType;
  } | null>(null);

  const [search, setSearch] = useState("");

  const [sortConfig, setSortConfig] = useState<{
    key: keyof PartnersProps;
    direction: "asc" | "desc";
  } | null>(null);

  const openConfirm = (id: string, action: ActionType) => {
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

  // Filtra por nome
  const filteredData = partners.filter((item) =>
    item.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const normalize = (val: string | number | null): string => {
    if (typeof val === "string") return val.toLowerCase();
    if (typeof val === "number") return val.toString();
    return "";
  };

  // Ordena os dados filtrados
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;
    const aVal = normalize(a[key]);
    const bVal = normalize(b[key]);

    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof PartnersProps) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      pixKey: "",
      rule: "",
    },
  });

  const openEditModal = (partnerUIDSelected: string) => {
    setPartnetUID(partnerUIDSelected);
    setIsModalEditOpen(true);
    console.log("ID:", partnerUIDSelected);

    setPartnerSelected(
      partners.find((partner) => partner.uid === partnerUIDSelected) ?? null
    );
  };

  if (partnerSelected) {
    setValue("name", partnerSelected.fullName);
    setValue("phone", partnerSelected.phone);
    setValue("email", partnerSelected.email);
    setValue("pixKey", partnerSelected.pixKey ?? "");
    setValue("rule", partnerSelected.rule);
  }

  const onSubmit = (data: EditUserFormData) => {
    //Lógica para enviar o formulário de edição
    console.log("Dados do usuário editado:", data);
  };

  return (
    <div className="flex h-full w-full overflow-x-auto bg-fifth-purple">
      <main className="flex-1 pt-9 pl-8 pr-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-4 text-[#fff]">Parceiros</h1>

        {/* Afiliação */}
        <Card className="h-[92%] overflow-x-auto no-scrollbar">
          <div className="px-4 -mt-2">
            <div className="pr-5">
              <h2 className="text-xl font-semibold mb-2">Usuários afiliados</h2>
            </div>
            <div className="mb-3 mt-2 w-[40%] flex flex-row items-center">
              <div className="w-2/4">
                <Input
                  type="text"
                  placeholder="Buscar..."
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
            </div>
            <div className="overflow-x-auto rounded-2xl">
              <table className="min-w-full table-fixed">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Editar</th>
                    <th
                      className="px-4 py-2 text-left cursor-pointer"
                      onClick={() => handleSort("fullName")}
                    >
                      Nome{" "}
                      {sortConfig?.key === "fullName" &&
                        (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      className="px-4 py-2 text-left cursor-pointer"
                      onClick={() => handleSort("rule")}
                    >
                      Regra{" "}
                      {sortConfig?.key === "rule" &&
                        (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      className="px-4 py-2 text-left cursor-pointer"
                      onClick={() => handleSort("indications")}
                    >
                      Indicações{" "}
                      {sortConfig?.key === "indications" &&
                        (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="px-4 py-2 text-left">Chave Pix</th>
                    <th className="px-4 py-2 text-left">Excluir</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((item) => (
                    <tr
                      key={item.uid}
                      className="even:bg-[#fff] odd:bg-gray-50"
                    >
                      <td className="px-4 py-2">
                        <MdEdit
                          className="cursor-pointer"
                          onClick={() => openEditModal(item.uid)}
                          size={20}
                        />
                      </td>
                      <td className="px-4 py-2">{item.fullName}</td>
                      <td className="px-4 py-2">{item.rule}</td>
                      <td className="px-4 py-2 space-x-2">
                        {item.indications}
                      </td>
                      <td className="px-4 py-2 space-x-2 ">{item.pixKey}</td>
                      <td className="px-4 py-2 text">
                        <Button
                          className="cursor-pointer bg-red hover:bg-red-400 transition-all duration-700 text-[0.9rem]"
                          variant="default"
                          size="sm"
                          onClick={() => openConfirm(item.uid, "reject")}
                        >
                          Excluir
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {/* diálogo de confirmação */}
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="w-100 border-2 border-blue">
                      <DialogHeader>
                        <DialogTitle>Deseja Excluir?</DialogTitle>
                      </DialogHeader>
                      <p className="py-4 text-center">
                        Você realmente deseja excluir este usuário?
                      </p>
                      <DialogFooter className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button
                          className="cursor-pointer  bg-red hover:bg-red-400 transition-all duration-700"
                          variant="default"
                          onClick={() => openConfirm("123", "approve")}
                        >
                          Excluir
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Modal de Observações
          <Dialog
            open={isModalEditOpen}
            onOpenChange={(open) => {
              setIsModalEditOpen(open);
              if (!open) {
                setPartnerSelected(null);
              }
            }}
          >
            <DialogContent
              className="w-[40%] h-[50%] flex flex-col border-2 border-blue"
              style={{ maxWidth: "none" } as React.CSSProperties}
            >
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>

              <div className="overflow-x-auto">
                <h1 className="font-bold">Editar usuário</h1>
              </div>
            </DialogContent>
          </Dialog> */}

        <Dialog
          open={isModalEditOpen}
          onOpenChange={(open) => {
            setIsModalEditOpen(open);
            if (!open) {
              setPartnerSelected(null);
            }
          }}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar usuário</DialogTitle>
              <DialogDescription>
                Faça alterações no usuário selecionado. Clique em "Salvar"
                quando terminar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input id="name" className="col-span-3" {...register("name")} />
                {errors.name && <span>{errors.name.message}</span>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  E-mail
                </Label>
                <Input
                  id="username"
                  className="col-span-3"
                  {...register("email")}
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Chave Pix
                </Label>
                <Input
                  id="username"
                  className="col-span-3"
                  {...register("pixKey")}
                />
                {errors.pixKey && <span>{errors.pixKey.message}</span>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Telefone
                </Label>
                <Input
                  id="username"
                  className="col-span-3"
                  {...register("phone")}
                />
                {errors.phone && <span>{errors.phone.message}</span>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Regra
                </Label>
                <Input
                  id="username"
                  className="col-span-3"
                  {...register("rule")}
                />
                {errors.rule && <span>{errors.rule.message}</span>}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
