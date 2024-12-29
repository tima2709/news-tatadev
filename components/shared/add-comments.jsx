'use client'

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { getComments, postComment } from "@/lib/fetchData";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
    text: z.string().min(1, {
        message: "Поле не может быть пустым",
    }),
    full_name: z.string().min(1, {
        message: "Поле не может быть пустым",
    })
})

const AddComments = ({ slug }) => {
    const [comments, setComments] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
            full_name: ""
        },
    });

    const onSubmit = async (values) => {
        console.log(values)
        try {
            await postComment(slug, values);
            toast({
                title: "Ваш комментарий отправлен на модерацию.",
            });
            form.reset();
            setIsDialogOpen(false);
        } catch (error) {
            toast({
                title: "Ошибка отправки комментария.",
                description: "Попробуйте еще раз позже.",
                variant: "destructive",
            });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setIsDialogOpen(true)
        }
    };

    useEffect(() => {
        const handleGetComments = async () => {
            const data = await getComments(slug);
            setComments(data.results);
        };
        handleGetComments();
    }, [slug]);

    const createdDate = (date) => {
        return format(date, "dd.MM.yyyy");
    };

    return (
        <div className="p-6 border border-[#E0EBFF] bg-white rounded-lg ">
            <h3 className="mb-4">Комментарии</h3>

            <div>
                {comments?.length
                    ? comments.map((comment) => (
                        <div key={comment.created_at} className="mb-4">
                            <div className="flex gap-4 items-center mb-2">
                                <h5>{comment.full_name}</h5>
                                <span
                                    className="text-[#777E98] font-normal text-xs">{createdDate(comment.created_at)}</span>
                            </div>
                            <p className="text-sm">{comment.text}</p>
                        </div>
                    ))
                    : <p className="mb-6">Здесь пока нет комментариев. Станьте первым!</p>
                }
            </div>

            <div className="mt-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <input
                                                {...field}
                                                type="text"
                                                onKeyDown={handleKeyDown}
                                                placeholder="Напишите комментарий"
                                                className="w-full px-4 py-4 border border-[#E0EBFF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D1E2FF]"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage className="absolute" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                <DialogTrigger
                                                    className="absolute right-3 -top-[60px] transform -translate-y-1/2 bg-transparent border-none hover:bg-white shadow-none"
                                                >
                                                    <Image src="/ic_send.svg" alt="send icon" width={24} height={24} />
                                                </DialogTrigger>
                                                <DialogContent className="md:w-full w-[90%] rounded-lg ">
                                                    <DialogHeader>
                                                        <DialogTitle className="font-bold text-[22px] text-[#101828]">Представьтесь,
                                                            пожалуйста</DialogTitle>
                                                        <DialogDescription>
                                                            <span className="font-normal text-sm text-[#101828] pb-2">Введите имя, которое будет отображаться рядом с вашим комментарием.</span>
                                                            <br />
                                                            <span className="font-medium text-base text-[#101828]">Внимание! Комментарий будет доступен всем пользователям после прохождения модерации</span>
                                                        </DialogDescription>
                                                        <div className="py-5">
                                                            <input
                                                                {...field}
                                                                type="text"
                                                                placeholder="Ваше имя"
                                                                className="w-full px-4 py-4 border border-[#E0EBFF] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D1E2FF]"
                                                            />
                                                        </div>
                                                        <div className="flex justify-end gap-4 mt-5">
                                                            <DialogClose asChild>
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    className="border-[#E0EBFF] text-[#101828] font-medium text-sm py-[10px] px-4 rounded-lg"
                                                                >
                                                                    Отмена
                                                                </Button>
                                                            </DialogClose>
                                                            <Button
                                                                type="button"
                                                                disabled={!field.value}
                                                                onClick={form.handleSubmit(onSubmit)}
                                                                className="border-[#E0EBFF] text-[#101828] disabled:text-[#777E98] font-medium text-sm py-[10px] px-4 rounded-lg bg-[#E0EBFF] hover:bg-[#D1E2FF]"
                                                            >
                                                                Подтвердить
                                                            </Button>
                                                        </div>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default AddComments;
