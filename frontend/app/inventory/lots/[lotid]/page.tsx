"use client"
import { SafeImage } from "@/components/SafeImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePageHeader } from "@/contexts/PageHeaderContext";
import { getPart, getPartCategories } from "@/lib/services/partsService";
import { cn } from "@/lib/utils";
import { Atom, Box, Calendar, CalendarPlus, Car, DollarSign, Grid, Info, List, Logs, MapPin, PencilRuler, ReceiptText, ScanEye, Table, Trash2, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getManufacturersshort } from "@/lib/services/manufacturerService";
import { SelectEx } from "@/components/selectEx";
import { Lot } from "@/lib/types";
import { DateInput } from "@/components/dateInput";
const EidtLotPage = () => {
    const { setHeader } = usePageHeader()
    useEffect(() => {
        setHeader("Edit Lot", "Add or edit a lot.");
    }, [setHeader])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [lot, setLot] = useState<Lot | null>(null);
    const params = useParams();
    const selectedPartId = params.partid as string;
    const handleDateChange = (field: keyof Lot, value: Date) => {
        setLot((prev) => prev ? { ...prev, [field]: value } : prev);
    };
    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <ReceiptText className="h-5 w-5" />
                        <Input className='text-2xl font-bold'
                            defaultValue={lot?._id}
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
                                    />
                                </div>
                            </div>

                        </div>
                        {/* Section 3 */}
                        <div className="border rounded-md divide-y h-full">
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>Received Date</span>
                                </div>
                                <div className="flex-shrink-0 w-[120px] text-right">
                                    <DateInput value={lot?.receivedDate || null} onChange={(date) => handleDateChange('receivedDate', date || new Date())} />
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    <span>Manufacture date</span>
                                </div>
                                <div className="flex-shrink-0 w-[120px] text-right">
                                    <DateInput value={lot?.manufactureDate || null} onChange={(date) => handleDateChange('manufactureDate', date || new Date())} />
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>Expiry Date</span>
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
                        <ReceiptText className="h-4 w-4" /> Additional Details
                    </CardTitle>
                </CardHeader>
                {/* <CardContent className="space-y-3">
                    <div>
                        <label className="text-sm font-medium">Model/Version</label>
                        <Input value={lot.model} onChange={(e) =>
                            setLot({ ...lot, model: e.target.value }) // ✅ updates object on change
                        }
                            placeholder="Enter Model, version or revision" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">SKU</label>
                        <Input value={lot.sku} onChange={(e) =>
                            setLot({ ...lot, sku: e.target.value }) // ✅ updates object on change
                        }
                            placeholder="Enter SKU" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">MPN (Manufacturer Part Number)</label>
                        <Input value={lot.mpn} onChange={(e) =>
                            setLot({ ...lot, mpn: e.target.value }) // ✅ updates object on change
                        }
                            placeholder="Enter MPN" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">UPC (Universal Product Code)</label>
                        <Input value={lot.mpn} onChange={(e) =>
                            setLot({ ...lot, mpn: e.target.value }) // ✅ updates object on change
                        }
                            placeholder="Enter UPC" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Manufacturer</label>
                        <SelectEx
                            data={getManufacturersshort()}
                            value={lot.manufacturer || null}
                            onDataChange={(value) => setLot({ ...lot, manufacturer: value || undefined })}
                            placeholder="Select manufacturer..."
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Category</label>
                        <SelectEx
                            data={getPartCategories()}
                            value={lot.category || null}
                            onDataChange={(value) => setLot({ ...lot, category: value || undefined })}
                            placeholder="Select Category..."
                            className="w-full"
                        />
                    </div>
                </CardContent> */}
            </Card>
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Logs className="h-4 w-4" /> Logs
                    </CardTitle>
                </CardHeader>
                {/* <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-medium">Length (mm)</label>
                            <Input type="number" value={lot.physical?.length || ''} onChange={(e) =>
                                setLot({ ...lot, physical: { ...lot.physical, length: e.target.value ? parseFloat(e.target.value) : undefined } }) // ✅ updates object on change
                            }
                                placeholder="Enter Length in mm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Width (mm)</label>
                            <Input type="number" value={lot.physical?.width || ''} onChange={(e) =>
                                setLot({ ...lot, physical: { ...lot.physical, width: e.target.value ? parseFloat(e.target.value) : undefined } }) // ✅ updates object on change
                            }
                                placeholder="Enter Width in mm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Height (mm)</label>
                            <Input type="number" value={lot.physical?.height || ''} onChange={(e) =>
                                setLot({ ...lot, physical: { ...lot.physical, height: e.target.value ? parseFloat(e.target.value) : undefined } }) // ✅ updates object on change
                            }
                                placeholder="Enter Height in mm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Weight (grams)</label>
                            <Input type="number" value={lot.physical?.weight || ''} onChange={(e) =>
                                setLot({ ...lot, physical: { ...lot.physical, weight: e.target.value ? parseFloat(e.target.value) : undefined } }) // ✅ updates object on change
                            }
                                placeholder="Enter Weight in grams" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Volume (cubic cm)</label>
                            <Input type="number" value={lot.physical?.volume || ''} onChange={(e) =>
                                setLot({ ...lot, physical: { ...lot.physical, volume: e.target.value ? parseFloat(e.target.value) : undefined } }) // ✅ updates object on change
                            }
                                placeholder="Enter Volume in cubic cm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Unit of Measure (UOM)</label>
                            <Input value={lot.physical?.uom || ''} onChange={(e) =>
                                setLot({ ...lot, physical: { ...lot.physical, uom: e.target.value || undefined } }) // ✅ updates object on change
                            }
                                placeholder="Enter Unit of Measure (e.g., pieces, meters)" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Color</label>
                            <Input value={lot.physical?.color || ''} onChange={(e) =>
                                setLot({ ...lot, physical: { ...lot.physical, color: e.target.value || undefined } }) // ✅ updates object on change
                            }
                                placeholder="Enter Color" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Material</label>
                            <Input value={lot.physical?.material || ''} onChange={(e) =>
                                setLot({ ...lot, physical: { ...lot.physical, material: e.target.value || undefined } }) // ✅ updates object on change
                            }
                                placeholder="Enter Material" />
                        </div>
                    </div>
                </CardContent> */}
            </Card>
            <Card>
                <CardContent >
                    <Button className="mt-4">Save Changes</Button>
                </CardContent>
            </Card>

        </div >
    )
}

export default EidtLotPage 