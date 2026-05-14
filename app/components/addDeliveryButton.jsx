"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddDeliveryButton({ deliveryDates, reload, setReload }) {
  const [rows, setRows] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState({});
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (deliveryDates?.length) {
      setRows(deliveryDates.map(d => ({ id: d.delivery_id, m: d.month, n: d.number, y: d.year })));
    }
  }, [deliveryDates]);

  const updateRow = (i, f, v) => {
    const c = [...rows];
    c[i][f] = v;
    setRows(c);
  };

  const deleteRow = async (i) => {
    const row = rows[i];
    if (!row.id) return;
    setLoadingDelete(p => ({ ...p, [row.id]: true }));
    await fetch("/api/deletedelivery", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: row.id }) });
    setRows(prev => prev.filter((_, idx) => idx !== i));
    setLoadingDelete(p => ({ ...p, [row.id]: false }));
    setReload(p => !p);
  };

  const addRow = async () => {
    const tempId = "temp-" + Date.now();
    setRows(prev => [...prev, { id: tempId, m: "Loading...", n: "", y: "", loading: true }]);
    setAdding(true);

    const now = new Date();
    const res = await fetch("/api/addDelivery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ m: now.toLocaleString("default", { month: "long" }), n: now.getDate(), y: now.getFullYear() })
    });

    const newDate = await res.json();

    setRows(prev => prev.map(r => r.id === tempId ? { id: newDate.delivery_id, m: newDate.month, n: newDate.number, y: newDate.year } : r));
    setAdding(false);
  };

  const saveAll = async () => {
    setSaving(true);
    await fetch("/api/editdelivery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(rows) });
    setSaving(false);
    setReload(p => !p);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="bg-text-light text-neutral-beige-light p-1 rounded-sm"><FontAwesomeIcon icon={faPencil} /></Button>
      </DialogTrigger>

      <DialogContent showCloseButton={false} className="max-w-2xl bg-neutral-beige-light rounded-md shadow-lg border border-text">
        <DialogHeader>
          <DialogTitle>Manage Delivery Dates</DialogTitle>
        </DialogHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row, i) =>
              row.loading ? (
                <TableRow key={row.id}>
                  <TableCell colSpan={4} className="text-center animate-pulse">Creating...</TableCell>
                </TableRow>
              ) : (
                <TableRow key={row.id}>
                  <TableCell><Input value={row.m} onChange={e => updateRow(i, "m", e.target.value)} className="border border-text" /></TableCell>
                  <TableCell><Input value={row.n} onChange={e => updateRow(i, "n", e.target.value)} className="border border-text" /></TableCell>
                  <TableCell><Input value={row.y} onChange={e => updateRow(i, "y", e.target.value)} className="border border-text" /></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" disabled={loadingDelete[row.id]} onClick={() => deleteRow(i)}>
                      {loadingDelete[row.id] ? <span className="animate-spin">⏳</span> : <FontAwesomeIcon icon={faTrash} />}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={addRow} disabled={adding} className="bg-primary text-neutral-blue-light"><FontAwesomeIcon icon={faPlus} /></Button>
          <Button variant="outline"onClick={saveAll} disabled={saving} className="bg-secondary text-neutral-beige-light">{saving ? "Saving..." : "Save Changes"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}