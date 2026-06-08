"use client"

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { AnalysisReport, Patient } from "@/app/types"
import { ChevronRight, Dot, DownloadIcon, BadgeCheck, BotMessageSquare, TriangleAlert, FlaskConicalIcon, Send, MoreVertical, DotIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableResultsManager } from "../../../components/TableResultManager";
import { PatientReportTitle } from "@/components/PatientReportTitle";

// Define the shape of the chat messages
interface ChatMessage {
    id: string;
    sender: 'ai' | 'doctor';
    text: string;
    timestamp: string;
}

interface viewProps {
    report: AnalysisReport;
    patient: Patient;
}


export function InteractiveAnalysisView({ report, patient }: viewProps) {

    // Chat state
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // Initialize with a welcome message
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'msg-1',
            sender: 'ai',
            text: `I have analyzed ${patient.name}'s current results. ${report.primaryFindings}. Would you like me to cross-reference their medication history?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);

    // Ref to automatically scroll the chat down as new words stream in
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // --- STREAMING LOGIC ---
    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        // Instantly add the doctor's message
        const newMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'doctor',
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMsg]);
        setInputValue(""); // Clear the input box
        setIsTyping(true); // Turn on the bouncing dots

        // Simulate network delay (1 second) before starting the stream
        setTimeout(() => {
            setIsTyping(false);
            startStreamingResponse(text);
        }, 1000);
    };

    const startStreamingResponse = (userQuery: string) => {
        // The full string we want the AI to eventually type out
        const fullResponse = `Based on your request regarding "${userQuery}", I am reviewing the historical data. The low MCV strongly suggests malabsorption or deficiency. I recommend proceeding with a comprehensive Iron Panel.`;

        // 3. Create an EMPTY AI message in the chat
        const aiMessageId = (Date.now() + 1).toString();
        const initialAiMsg: ChatMessage = {
            id: aiMessageId,
            sender: 'ai',
            text: "",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, initialAiMsg]);

        // 4. Stream the text token by token (word by word)
        const words = fullResponse.split(" ");
        let currentWordIndex = 0;

        const typingInterval = setInterval(() => {
            if (currentWordIndex < words.length) {
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg.id === aiMessageId
                            ? { ...msg, text: msg.text + (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex] }
                            : msg
                    )
                );
                currentWordIndex++;
            } else {
                clearInterval(typingInterval); // Stop the timer when done
            }
        }, 50); // 50ms per word
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isTyping) {
            handleSendMessage(inputValue);
        }
    };

    // Find the first critical or borderline result to suggest asking about
    const abnormalResults = report.results.filter(r => r.status === 'Critical' || r.status === 'Borderline');

    // Generate an array of dynamic strings based on the patient's actual data
    const dynamicSuggestions = [
        abnormalResults.length > 0
            ? `Explain ${abnormalResults[0].analyte} risks`
            : "Summarize normal findings",
        "Check Drug Interactions",
        `Compare to previous ${report.analysisType} panel`
    ];

    return (
        <div className="w-full mx-auto space-y-6">

            <div className="flex flex-col items-start justify-center gap-4">
                {/* Breadcrumb */}
                <div className="flex flex-row items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <span className="">Analysis</span>
                    <span className=""><ChevronRight className="w-4 h-4"></ChevronRight></span>
                    <span>Report #{report.id}</span>
                </div>

                {/* title */}
                <div className="w-full flex flex-col justify-center items-start gap-2 md:flex-row md:justify-between md:items-start">
                    <PatientReportTitle report={report} patient={patient} />

                    {/* buttons container */}
                    <div className="flex flex-row justify-between items-center gap-2 md:gap-3 lg:gap-4">
                        <Button
                            variant={"outline"}
                            className="flex flex-row items-center justify-center gap-1 lg:gap-3"
                            onClick={() => {
                                toast.info("Generating PDF file...", {
                                    description: "The system is exporting patient data."
                                });
                            }}
                        >
                            <DownloadIcon className="w-5 h-5" /> Export PDF
                        </Button>

                        <Button
                            className="flex flex-row items-center justify-center gap-1 lg:gap-2"
                            onClick={() => {
                                toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
                                    loading: 'Validating data...',
                                    success: 'The report has been successfully verified!',
                                    error: 'An error occurred.',
                                });
                            }}
                        >
                            <BadgeCheck className="w-5 h-5" /> Validate Analysis
                        </Button>
                    </div>
                </div>
            </div>

            {/* Two Column Dashboard Grid Structure */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 space-y-6">

                {/* AI summary and Report Table */}
                <div className="lg:col-span-2 space-y-6">
                    {/* AI summary */}
                    <div className="lg:col-span-2 border border-primary/20 bg-primary/10 rounded-xl p-2 md:p-4 lg:p-6 shadow-sm flex flex-col md:flex-row gap-5 items-start">
                        <div className="bg-primary p-3 rounded-xl text-primary-foreground shadow-sm shrink-0 mt-1">
                            <BotMessageSquare className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className="text-primary">AI Critical Diagnostic Findings</h3>
                            <p className="text-sm md:text-base text-muted-foreground my-2 lg:my-4">
                                {report.primaryFindings}
                            </p>

                            <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-3">
                                <div className="w-full h-full bg-background rounded-lg px-4 py-4 lg:px-6 lg:py-6 border border-border shadow-sm">
                                    <h4 className="">Primary Concern</h4>
                                    <div className="text-destructive flex items-center justify-start gap-2">
                                        <TriangleAlert className="w-5 h-5" />
                                        <span className="font-bold">{report.overallStatus} Alert</span>
                                    </div>
                                </div>
                                <div className="w-full h-full bg-background rounded-lg px-4 py-4 lg:px-6 lg:py-6 border border-border shadow-sm">
                                    <h4 className="">Recommended Action</h4>
                                    <div className="text-primary  flex items-center justify-start gap-2">
                                        <FlaskConicalIcon className="w-5 h-5 " />
                                        <span className="font-bold">Add Serum Iron & TIBC</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Dynamic Lab Panels Data Grid Display with Filter Bar */}
                    <TableResultsManager report={report} />

                </div>

                {/* AI chat */}
                <div className="bg-background border rounded-xl shadow-sm overflow-hidden sticky top-20 flex flex-col h-[600px] lg:h-[calc(70vh)]">

                    {/* Assistant Header Section */}
                    <div className="p-4 border-b flex items-center justify-between bg-slate-50/50 dark:bg-zinc-900/50 shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="font-bold text-sm text-slate-800 dark:text-zinc-200">
                                LabInsight AI Assistant
                            </span>
                        </div>
                        <button className="text-muted-foreground p-1 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded">
                            <MoreVertical className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages Flow Area Container */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs md:text-sm">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`space-y-1.5 ${msg.sender === 'doctor' ? 'flex flex-col items-end' : ''}`}>
                                <span className={`text-[10px] lg:text-xs font-bold uppercase flex flex-row items-center justify-start gap-0 ${msg.sender === 'doctor' ? 'text-muted-foreground text-right' : 'text-primary'}`}>
                                    {msg.sender === 'ai' ? (
                                        <>LABINSIGHT AGENT <DotIcon className="" /> {msg.timestamp}</>
                                    ) : (
                                        <>{msg.timestamp} <DotIcon className="" /> DR. SARAH CHEN</>
                                    )}
                                </span>
                                <div className={`p-3.5 rounded-xl leading-relaxed shadow-3xs max-w-[85%] ${msg.sender === 'doctor'
                                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                                    : 'bg-muted text-foreground rounded-tl-none border border-border'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Agent Typeloader Status */}
                        {isTyping && (
                            <div className="space-y-1">
                                <span className="text-[10px] lg:text-xs font-bold text-primary uppercase flex flex-row items-center justify-start gap-0">
                                    LABINSIGHT AGENT
                                </span>
                                <div className="flex items-center gap-1 bg-muted px-4 py-2.5 rounded-full w-16 justify-center rounded-tl-none border border-border">
                                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Interactive Suggestions Actions Hub */}
                    <div className="px-4 py-2 border-t flex flex-wrap gap-2 shrink-0 bg-background">
                        {dynamicSuggestions.map((suggestion, index) => (
                            <Button
                                key={index}
                                variant={"outline"}
                                onClick={() => handleSendMessage(suggestion)}
                                disabled={isTyping}
                                className="text-muted-foreground text-[10px] lg:text-xs px-3 py-1.5 rounded-full h-auto shadow-sm hover:border-primary hover:text-primary transition-colors"
                            >
                                "{suggestion}"
                            </Button>
                        ))}
                    </div>

                    {/* Input Box Prompt Bar */}
                    <div className="p-3 border-t shrink-0">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Ask me something..."
                                // If inputValue is ever undefined or null, just use an empty string instead.
                                value={inputValue || ""}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isTyping}
                                className="w-full h-10 pl-3 pr-10 border rounded-lg text-xs outline-none bg-muted focus:border-ring transition-all disabled:opacity-50"
                            />
                            <Button
                                onClick={() => handleSendMessage(inputValue)}
                                disabled={!inputValue.trim() || isTyping}
                                className="absolute right-1 p-1.5 h-8 w-8 rounded-md"
                            >
                                <Send className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}