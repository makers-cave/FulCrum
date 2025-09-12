"use client"
import { SafeImage } from "@/components/SafeImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePageHeader } from "@/contexts/PageHeaderContext";
import { sampleParts } from "@/lib/data";
import { Box, Calendar, CalendarPlus, DollarSign, Grid, Info, List, MapPin, PencilRuler, ReceiptText, Table, Trash2, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const PartPage = () => {
    const { setHeader } = usePageHeader()

    useEffect(() => {
        setHeader("Edit Part", "Edit the Part.");
    }, [setHeader])
    const params = useParams();
    const selectedPartId = params.partid as string;
    const selectedPart = sampleParts.find(part => part._id === selectedPartId);
    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <ReceiptText className="h-5 w-5" />
                        {selectedPart ? selectedPart.name : "Select a part to view details"}
                    </CardTitle>

                </CardHeader>
                <CardContent className="p-4 grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-4 w-full">
                        {/* Section 1 - Image */}
                        <div className="flex items-center justify-center border rounded-md bg-muted p-2  h-48 ">
                            <SafeImage
                                src={selectedPart?.image}
                                alt="Part"
                                width={120}
                                height={120}
                                className="object-contain"
                            />
                        </div>

                        {/* Section 2 */}
                        <div className="border rounded-md divide-y h-full">
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    <span>Assembly part</span>
                                </div>
                                <Badge>
                                    {selectedPart?.isAssemblable ? "Yes" : "No"}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>Sellable</span>
                                </div>
                                <Badge variant="secondary">{selectedPart?.isSellable ? "Yes" : "No"}</Badge>
                            </div>
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>Purchasable</span>
                                </div>
                                <Badge variant="outline">{selectedPart?.isPurchasable ? "Yes" : "No"}</Badge>
                            </div>
                        </div>
                        {/* Section 3 */}
                        <div className="border rounded-md divide-y h-full">
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    <span>Price Range</span>
                                </div>
                                <span>-</span>
                            </div>
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>Default Loc.</span>
                                </div>
                                <Button variant="link" className="p-0 text-blue-600">
                                    {selectedPart?.defaultLocation || "-"}
                                </Button>
                            </div>
                            <div className="flex justify-between items-center p-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>Responsible</span>
                                </div>
                                <Button variant="link" className="p-0 text-blue-600">
                                    {selectedPart?.respnsibleUser || "-"}
                                </Button>
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default PartPage