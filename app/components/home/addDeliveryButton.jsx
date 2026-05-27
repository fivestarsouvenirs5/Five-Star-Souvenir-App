"use client";

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Modal, Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

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
   <>
      {/* OPEN BUTTON */}
      <Button
        onClick={() => setOpen(true)}
        className="bg-text-light text-neutral-beige-light rounded-sm items-center text-sm"
        size="xs"
      >
        <FontAwesomeIcon icon={faPencil} />
      </Button>

      {/* MODAL (Flowbite default styling) */}
      <Modal show={open} onClose={() => setOpen(false)} size="4xl">

        <Modal.Header>
          Manage Delivery Dates
        </Modal.Header>

        <Modal.Body>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Month</th>
                  <th className="py-2">Day</th>
                  <th className="py-2">Year</th>
                  <th className="py-2 w-20"></th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, i) =>
                  row.loading ? (
                    <tr key={row.id}>
                      <td colSpan={4} className="py-6 text-center animate-pulse">
                        Creating...
                      </td>
                    </tr>
                  ) : (
                    <tr key={row.id} className="border-b">
                      <td className="py-2">
                        <input
                          value={row.m}
                          onChange={(e) => updateRow(i, "m", e.target.value)}
                          className="border rounded px-2 py-1 w-20"
                        />
                      </td>

                      <td className="py-2">
                        <input
                          value={row.n}
                          onChange={(e) => updateRow(i, "n", e.target.value)}
                          className="border rounded px-2 py-1 w-20"
                        />
                      </td>

                      <td className="py-2">
                        <input
                          value={row.y}
                          onChange={(e) => updateRow(i, "y", e.target.value)}
                          className="border rounded px-2 py-1 w-24"
                        />
                      </td>

                      {/* DELETE BUTTON (custom color only here) */}
                      <td className="py-2 text-right">
                        <Button
                          onClick={() => deleteRow(i)}
                          disabled={loadingDelete[row.id]}
                          size="xs"
                          className="bg-white text-destructive items-center !hover:bg-secondary-light"
                        >
                          {loadingDelete[row.id] ? (
                            <span className="animate-spin">⏳</span>
                          ) : (
                            <FontAwesomeIcon icon={faTrash} />
                          )}
                        </Button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </Modal.Body>

        <Modal.Footer>
          {/* ADD BUTTON */}
          <Button
            onClick={addRow}
            disabled={adding}
            className="bg-primary text-neutral-blue-light hover:bg-primary-dark items-center"
            size="xs"
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>

          {/* SAVE BUTTON */}
          <Button
            onClick={saveAll}
            disabled={saving}
            className="bg-secondary text-neutral-beige-light hover:bg-secondary-dark items-center"
            size="xs"
          >
            <FontAwesomeIcon icon={faCheck} />
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}