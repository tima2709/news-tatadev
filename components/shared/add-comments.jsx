'use client'

import React, {useState} from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import { useForm } from "react-hook-form"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {postComment} from "@/lib/fetchData";

const AddComments = ({slug}) => {

    const [commnets, setComments] = useState([])

    const form = useForm({
        defaultValues: {
            text: "",
            full_name: ""
        },
    })

    const onSubmit = async (values) => {
        console.log(values, 'val')
        await postComment(slug, values)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('enter comment')
        }
    };

    return (
        <div className="p-6 border border-[#E0EBFF] bg-white rounded-lg ">
            <h3 className="mb-4">Комментарии</h3>
            <p className="mb-6">Здесь пока нет комментариев. Станьте первым!</p>
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
                                        <div className={'relative'}>
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
                                    <FormMessage />
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
                                        <div className={'relative'}>
                                            <Dialog>
                                                <DialogTrigger className="absolute right-3 -top-[60px] transform -translate-y-1/2 bg-transparent border-none hover:bg-white shadow-none">
                                                    <Image src="/ic_send.svg" alt="send icon" width={24} height={24}/>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle className="font-bold text-[22px] text-[#101828]">Представьтесь, пожалуйста</DialogTitle>
                                                        <DialogDescription>
                                                            <span className="font-normal text-sm text-[#101828] pb-2">Введите имя, которое будет отображаться рядом с вашим комментарием.</span>
                                                            <br/>
                                                            <span className="font-medium text-base text-[#101828]">Внимание! Комментарий будет доступен всем пользователям после прохождения модерации</span>
                                                        </DialogDescription>
                                                        <div className="py-5">
                                                            <input
                                                                {...field}
                                                                type="text"
                                                                onKeyDown={handleKeyDown}
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

