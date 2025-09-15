"use client"
import { SafeImage } from "@/components/SafeImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePageHeader } from "@/contexts/PageHeaderContext";
import { partsData } from "@/lib/data";
import { getPart, getPartCategories } from "@/lib/services/partsService";
import { Part } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Box, Calendar, CalendarPlus, Car, DollarSign, Grid, Info, List, MapPin, PencilRuler, ReceiptText, Table, Trash2, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";
import { NotFound } from "@/components/notFound";
import { PickInput } from "@/components/pickInput";
import { getManufacturersshort } from "@/lib/services/manufacturerService";
import { SelectEx } from "@/components/selectEx";

const PartPage = () => {
    const { setHeader } = usePageHeader()
    useEffect(() => {
        setHeader("Edit Part", "Edit the Part.");
    }, [setHeader])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [part, setPart] = useState<Part | null>(null);
    const params = useParams();
    const selectedPartId = params.partid as string;
    const [editingField, setEditingField] = useState<string | null>(null);
    const toggleField = (field: keyof Part) => {
        if (!part) return;
        setPart((prev) => prev ? { ...prev, [field]: !prev[field] } : prev);
    };
    const handleChange = (field: keyof Part, value: string) => {
        setPart((prev) => prev ? { ...prev, [field]: !prev[field] } : prev);
        setEditingField(null);
    };
    useEffect(() => {
        async function loadParts() {
            try {
                const t = await getPart(selectedPartId);
                if (t) {
                    setPart(t)
                } else {
                    setError(true);
                }
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        loadParts()
    }, [selectedPartId]);


    const [productName, setProductName] = useState("");

    if (loading) {
        return <Spinner text="Loading part..." />
    }
    else if (error || !part) {
        return <NotFound entityName="Part" backHref="/inventory/parts" backLabel="Go back to Parts" />
    } else {
        return (
            <div className="p-6 space-y-6">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <ReceiptText className="h-5 w-5" />
                            <Input className='text-2xl font-bold'
                                defaultValue={part.name}
                                autoFocus
                            />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-4 w-full">
                            {/* Section 1 - Image */}
                            <div className="flex items-center justify-center border rounded-md bg-muted p-2  h-48 ">
                                <SafeImage
                                    src={part?.image}
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
                                        />
                                    </div>
                                </div>

                            </div>
                            {/* Section 3 */}
                            <div className="border rounded-md divide-y h-full">
                                <div className="flex justify-between items-center p-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        <span>Virtual part</span>
                                    </div>
                                    <Badge variant="outline" title={part?.isVirtual
                                        ? "This part is a virtual part, such as a software product or license."
                                        : "This part represents a physical inventory item."}
                                        className={cn(
                                            "cursor-pointer",
                                            part?.isVirtual ? "bg-gray-100 text-primary-foreground" : "bg-gray-600 text-secondary-foreground"
                                        )}
                                        onClick={() => toggleField("isVirtual")}>{part?.isVirtual ? "Yes" : "No"}</Badge>
                                </div>
                                <div className="flex justify-between items-center p-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="h-4 w-4" />
                                        <span>Assembly part</span>
                                    </div>
                                    <Badge variant="outline" title={part?.isAssemblable
                                        ? "This part can be used as a component in assemblies."
                                        : "This part is a standalone item and cannot be used in assemblies."}
                                        className={cn(
                                            "cursor-pointer",
                                            part?.isAssemblable ? "bg-gray-100 text-primary-foreground" : "bg-gray-600 text-secondary-foreground"
                                        )}
                                        onClick={() => toggleField("isAssemblable")}>{part?.isAssemblable ? "Yes" : "No"}</Badge>
                                </div>
                                <div className="flex justify-between items-center p-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        <span>Sellable</span>
                                    </div>
                                    <Badge variant="outline" title={part?.isSellable
                                        ? "This part can be sold individually."
                                        : "This part should be assembled as product, to sell."}
                                        className={cn(
                                            "cursor-pointer",
                                            part?.isSellable ? "bg-gray-100 text-primary-foreground" : "bg-gray-600 text-secondary-foreground"
                                        )}
                                        onClick={() => toggleField("isSellable")}>{part?.isSellable ? "Yes" : "No"}</Badge>
                                </div>
                                <div className="flex justify-between items-center p-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        <span>Purchasable</span>
                                    </div>
                                    <Badge variant="outline" title={part?.isPurchasable
                                        ? "This part can sourced from suppliers/manufacturers."
                                        : "This part has to be produced in-house, may be with other parts."}
                                        className={cn(
                                            "cursor-pointer",
                                            part?.isPurchasable ? "bg-gray-100 text-primary-foreground" : "bg-gray-600 text-secondary-foreground"
                                        )}
                                        onClick={() => toggleField("isPurchasable")}>{part?.isPurchasable ? "Yes" : "No"}</Badge>
                                </div>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {/* 🔹 Additional editable fields below */}
                <Card>
                    <CardHeader>
                        <CardTitle>Identification & Classification</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <label className="text-sm font-medium">Model/Version</label>
                            <Input value={part.model} onChange={(e) =>
                                setPart({ ...part, model: e.target.value }) // ✅ updates object on change
                            }
                                placeholder="Enter Model, version or revision" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">SKU</label>
                            <Input value={part.sku} onChange={(e) =>
                                setPart({ ...part, sku: e.target.value }) // ✅ updates object on change
                            }
                                placeholder="Enter SKU" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">MPN (Manufacturer Part Number)</label>
                            <Input value={part.mpn} onChange={(e) =>
                                setPart({ ...part, mpn: e.target.value }) // ✅ updates object on change
                            }
                                placeholder="Enter MPN" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">UPC (Universal Product Code)</label>
                            <Input value={part.mpn} onChange={(e) =>
                                setPart({ ...part, mpn: e.target.value }) // ✅ updates object on change
                            }
                                placeholder="Enter UPC" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Manufacturer</label>
                            <SelectEx 
                            data={getManufacturersshort()}
                            value={part.manufacturer || null}
                            onDataChange={(value) => setPart({ ...part, manufacturer: value || undefined })}
                            placeholder="Select manufacturer..."
                            className="w-full"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Category</label>
                            <SelectEx 
                            data={getPartCategories()}
                            value={part.category || null}
                            onDataChange={(value) => setPart({ ...part, category: value || undefined })}
                            placeholder="Select Category..."
                            className="w-full"
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Physical Attributes</CardTitle>  
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm font-medium">Length (mm)</label>
                                <Input type="number" value={part.physical?.length || ''} onChange={(e) =>
                                    setPart({ ...part, physical: { ...part.physical, length: e.target.value ? parseFloat(e.target.value) : undefined } }) // ✅ updates object on change
                                }
                                    placeholder="Enter Length in mm" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Width (mm)</label>
                                <Input type="number" value={part.physical?.width || ''} onChange={(e) =>
                                    setPart({ ...part, physical: { ...part.physical, width: e.target.value ? parseFloat(e.target.value) : undefined } }) // ✅ updates object on change
                                }
                                    placeholder="Enter Width in mm" />
                            </div>
                            <div>       
                                <label className="text-sm font-medium">Height (mm)</label>      
                                <Input type="number" value={part.physical?.height || ''} onChange={(e) =>
                                    setPart({ ...part, physical: { ...part.physical, height: e.target.value ? parseFloat(e.target.value) : undefined } }) // ✅ updates object on change
                                }
                                    placeholder="Enter Height in mm" />
                            </div>  
                            <div>
                                <label className="text-sm font-medium">Weight (grams)</label>
                                <Input type="number" value={part.physical?.weight || ''} onChange={(e) =>
                                    setPart({ ...part, physical: { ...part.physical, weight: e.target.value ? parseFloat(e.target.value) : undefined } }) // ✅ updates object on change
                                }
                                    placeholder="Enter Weight in grams" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Volume (cubic cm)</label>    
                                <Input type="number" value={part.physical?.volume || ''} onChange={(e) =>
                                    setPart({ ...part, physical: { ...part.physical, volume: e.target.value ? parseFloat(e.target.value) : undefined } }) // ✅ updates object on change
                                }
                                    placeholder="Enter Volume in cubic cm" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Unit of Measure (UOM)</label>
                                <Input value={part.physical?.uom || ''} onChange={(e) =>
                                    setPart({ ...part, physical: { ...part.physical, uom: e.target.value || undefined } }) // ✅ updates object on change
                                }
                                    placeholder="Enter Unit of Measure (e.g., pieces, meters)" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Color</label>
                                <Input value={part.physical?.color || ''} onChange={(e) =>
                                    setPart({ ...part, physical: { ...part.physical, color: e.target.value || undefined } }) // ✅ updates object on change
                                }
                                    placeholder="Enter Color" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Material</label>
                                <Input value={part.physical?.material || ''} onChange={(e) =>   
                                    setPart({ ...part, physical: { ...part.physical, material: e.target.value || undefined } }) // ✅ updates object on change
                                }
                                    placeholder="Enter Material" />
                            </div>
                        </div>
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

export default PartPage