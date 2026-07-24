import { useState } from "preact/hooks";
import { ArrowRightIcon, SpinnerIcon } from "../components/Icons.tsx";

export default function Contact({contact_place = "contact"}: {contact_place?: string}) {
    const WEBHOOK_URL = "https://discord.com/api/webhooks/1292491295042048010/eaIjIrqefDTWtxOdw38yN6a_kNAknPm1s1QldWOFgI0OgOcZ-xFFuk8HypZk-kAj2Moy"

    const [messageError, setMessageError] = useState("");
    const [isSending, setIsSending] = useState(false);

    const sendMessage = async () => {
        const message = document.getElementById("contact_message") as HTMLTextAreaElement;
        const email = document.getElementById("contact_email") as HTMLInputElement;

        document.getElementById("contact_success")?.classList.add("hidden");
        setMessageError("");

        if (message.value.length < 10) {
            setMessageError("Message is too short. It must be at least 10 characters long.");
            return;
        }

        if (message.value.length > 3000) {
            setMessageError("Message is too long. It must be less than 3000 characters long.");
            return;
        }

        setIsSending(true);

        try {
            const webhookPayload = {
                embeds: [
                    {
                        title: `New message at ${contact_place}`,
                        description: message.value,
                        fields: [
                            {
                                name: "Email left:",
                                value: email.value || "No email provided",
                                inline: true
                            }
                        ],
                        color: 0x0099ff,
                        timestamp: new Date().toISOString(),
                        footer: {
                            text: "Contact Form Submission"
                        }
                    }
                ]
            };

            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(webhookPayload)
            });

            if (!response.ok) {
                setMessageError("Failed to send message. Please try again later.");
                throw new Error(`Discord webhook failed: ${response.status} ${response.statusText}`);
            }

            message.value = "";
            email.value = "";
            setMessageError("");
            document.getElementById("contact_success")?.classList.remove("hidden");

        } catch (error) {
            console.error("Error sending message:", error);
            setMessageError("Failed to send message. Please try again later.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            <div class="mb-6">
                <span class="block text-sm mb-2 opacity-75">Your email (optional)</span>
                <input 
                    type="text" 
                    id="contact_email" 
                    placeholder="name.surname@gmail.com" 
                    class="w-full px-4 py-3 bg-background-black border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red transition-all duration-200"
                />
            </div>

            <div class="mb-6">
                <span class="block text-sm mb-2 opacity-75">Message</span>
                <textarea 
                    id="contact_message" 
                    placeholder="Hello, keewinek! I really wanna tell you that..." 
                    class="w-full px-4 py-3 bg-background-black border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red transition-all duration-200 resize-none h-32"
                ></textarea>
            </div>

            <p class="text-red my-2" id="contact_error">{messageError}</p>
            <p class="text-green-200 my-2 hidden" id="contact_success">Message sent successfully!</p>

            <button 
                class="w-full text-center text-red border border-red px-6 py-3 rounded-full transition-all duration-200 hover:bg-red hover:text-background-black font-bold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                id="contact_send_button"
                onClick={sendMessage}
                disabled={isSending}
            >
                <span class="mx-auto w-full px-6">{isSending ? "Sending..." : "Send"}</span>
                {isSending ? (
                    <SpinnerIcon class="w-4 h-4 ml-auto animate-spin" />
                ) : (
                    <ArrowRightIcon class="w-4 h-4 ml-auto" />
                )}
            </button>
        </>
    );
}
