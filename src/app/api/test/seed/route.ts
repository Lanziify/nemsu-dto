import { DtoFirestoreCollection } from '@/lib/firestoreReference';
import { DtoRequestStatus, DtoUserRole } from '@/types/firebase'
import { getFirestore } from 'firebase-admin/firestore'
import { NextResponse } from 'next/server'

export function POST() {
    const position = [
        "Instructor I",
        "Instructor II",
        "Instructor II",
        "Assistant Professor I",
        "Assistant Professor II",
        "Assistant Professor III",
        "Assistant Professor IV",
        "Associate Professor I",
        "Associate Professor II",
        "Associate Professor III",
        "Associate Professor IV",
        "Professor I",
        "Professor II",
        "Professor III",
        "Professor IV",
        "Professor V",
        "Professor VI",
    ] as const

    const DtoPositions = position.reduce((acc, key) => {
        acc[key] = key
        return acc
    }, {} as Record<typeof position[number], string>)

    const seedMap = {
        [DtoFirestoreCollection.STATUS]: DtoRequestStatus,
        [DtoFirestoreCollection.ROLES]: DtoUserRole,
        [DtoFirestoreCollection.POSITIONS]: DtoPositions
    }

    Object.entries(seedMap).forEach(async ([collection, item]) => {
        for (const value in item) {
            await getFirestore().collection(collection).doc().set({ name: value })
        }
    })

    return NextResponse.json({ success: true })
}