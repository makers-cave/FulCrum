"use client"
import { SafeImage } from "@/components/SafeImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePageHeader } from "@/contexts/PageHeaderContext";
import { DollarSign, Factory, Logs, MapPin, ReceiptText, ShieldAlert, User } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SelectEx } from "@/components/selectEx";
import { Lot, LotHistory } from "@/lib/types";
import { DateInput } from "@/components/dateInput";
import { getLocationsshort } from "@/lib/services/locationService";
import { getSuppliersShort } from "@/lib/services/supplierService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getLot, getLotHistory } from "@/lib/services/lotService";
import { Spinner } from "@/components/spinner";
import { NotFound } from "@/components/notFound";
const EidtLotPage = () => {
    const { setHeader } = usePageHeader()
    useEffect(() => {
        setHeader("Edit Lot", "Add or edit a lot.");
    }, [setHeader])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [lot, setLot] = useState<Lot | null>(null);
    const [lotHistory, setLotHistory] = useState<LotHistory[]>([]);
    const params = useParams();
    const selectedLotId = params.lotid as string;
    const handleDateChange = (field: keyof Lot, value: Date) => {
        setLot((prev) => prev ? { ...prev, [field]: value } : prev);
    };
    useEffect(() => {
        async function loadParts() {
            try {
                const t = await getLot(selectedLotId);
                if (t) {
                    setLot(t)
                    const lh = await getLotHistory(selectedLotId);
                    setLotHistory(lh || []);
                } else {
                    setError(true);
                    console.log("Lot not found for ", selectedLotId);
                }
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        loadParts()
    }, [selectedLotId]);
    if (loading) {
        return <Spinner text="Loading Lot..." />
    }
    else if (error || !lot) {
        return <NotFound entityName="Lots" backHref="/inventory/stocks" backLabel="Go back to Stocks" />
    } else {
        return (
            <div className="p-6 space-y-6">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <ReceiptText className="h-5 w-5" />
                            <Input className='text-2xl font-bold'
                                defaultValue={lot?.lotNumber}
                                autoFocus
                            />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-4 w-full">
                            {/* Section 1 - Image */}
                            <div className="flex items-center justify-center border rounded-md bg-muted p-2  h-48 ">
                                <SafeImage
                                    src={lot?.image}
                                    alt="Part"
                                    width={120}
                                    height={120}
                                    className="object-contain"
                                />
                            </div>

                            {/* Section 2 */}
                            <div className="border rounded-md divide-y h-full">
                                <div className="flex justify-between items-center p-2 text-sm">
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className="text-sm font-medium">Description</label>
                                        <Input
                                            placeholder="This is a longer description"
                                            className="w-full h-32"
                                            value={lot?.description || ''}
                                            onChange={(e) =>
                                                setLot((prev) => prev ? { ...prev, description: e.target.value } : prev)
                                            }
                                        />
                                    </div>
                                </div>

                            </div>
                            {/* Section 3 */}
                            <div className="border rounded-md divide-y h-full">
                                <div className="flex justify-between items-center p-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <ReceiptText className="h-4 w-4" />
                                        <span>Received</span>
                                    </div>
                                    <div className="flex-shrink-0 w-[120px] text-right">
                                        <DateInput value={lot?.receivedDate || null} onChange={(date) => handleDateChange('receivedDate', date || new Date())} />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Factory className="h-4 w-4" />
                                        <span>Manufactured</span>
                                    </div>
                                    <div className="flex-shrink-0 w-[120px] text-right">
                                        <DateInput value={lot?.manufactureDate || null} onChange={(date) => handleDateChange('manufactureDate', date || new Date())} />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <ShieldAlert className="h-4 w-4" />
                                        <span>Expiry</span>
                                    </div>
                                    <div className="flex-shrink-0 w-[120px] text-right">
                                        <DateInput value={lot?.expiryDate || null} onChange={(date) => handleDateChange('expiryDate', date || new Date())} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {/* 🔹 Additional editable fields below */}
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <ReceiptText className="h-4 w-4" /> Identification Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <label className="text-sm font-medium">Product/Part</label>
                            {lot?.part ? (
                                <Input value={lot?.part.name} readOnly />
                            ) : (
                                <Input value={lot?.product?.name} readOnly />
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-medium">Batch #</label>
                            <Input value={lot?.supplierBatchNumber} onChange={(e) =>
                                setLot((prev) => prev ? { ...prev, supplierBatchNumber: e.target.value } : prev) // ✅ updates object on change
                            }
                                placeholder="Enter Batch Number" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Supplier</label>
                            <SelectEx
                                data={getSuppliersShort()}
                                value={lot?.supplier || null}
                                onDataChange={(value) => setLot((prev) => prev ? { ...prev, supplier: value || undefined } : prev)}
                                placeholder="Select Supplier of the lot..."
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Quantity</label>
                            <Input type="Number" value={lot?.quantity} onChange={(e) =>
                                setLot((prev) => prev ? { ...prev, quantity: parseFloat(e.target.value) || 0 } : prev) // ✅ updates object on change
                            }
                                placeholder="Enter Quantity" />
                        </div>
                        <div>
                            <label className="text-sm font-medium"># of Packages</label>
                            <Input type="Number" value={lot?.packageCount} onChange={(e) =>
                                setLot((prev) => prev ? { ...prev, packageCount: e.target.value } : prev) // ✅ updates object on change
                            }
                                placeholder="Enter Number of packages" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Package Description</label>
                            <Input value={lot?.packageDesc} onChange={(e) =>
                                setLot((prev) => prev ? { ...prev, packageDesc: e.target.value } : prev) // ✅ updates object on change
                            }
                                placeholder="Enter Description of Package, e.g. 5 items per package" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Total Cost</label>
                            <Input type="Number" value={lot?.totalCost} onChange={(e) =>
                                setLot((prev) => prev ? { ...prev, packageDesc: e.target.value } : prev) // ✅ updates object on change
                            }
                                placeholder="Total Cost of the Lot" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Location</label>
                            <SelectEx
                                data={getLocationsshort()}
                                value={lot?.location || null}
                                onDataChange={(value) => setLot((prev) => prev ? { ...prev, location: value || undefined } : prev)}
                                placeholder="Select Location..."
                                className="w-full"
                            />
                        </div>

                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Logs className="h-4 w-4" /> Logs
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Quantity Δ</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Change by</TableHead>
                                    <TableHead>Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {lotHistory.sort((a, b) => b.date.getTime() - a.date.getTime()).map((lh) => (
                                    <TableRow key={lh.id} className="cursor-pointer hover:bg-accent">
                                        <TableCell>
                                            {lh.date.toDateString()}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {lh.action}
                                        </TableCell>
                                        <TableCell>{lh.qtyChange}</TableCell>
                                        <TableCell>{lh.order}</TableCell>
                                        <TableCell>{lh.user}</TableCell>
                                        <TableCell>{lh.details}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent >
                        <Button className="mt-4">Save Changes</Button>
                    </CardContent>
                </Card>

            </div >
        )
    }
}

export default EidtLotPage 