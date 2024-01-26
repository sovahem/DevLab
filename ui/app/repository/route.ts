import AdmZip from 'adm-zip';
import { NextResponse } from 'next/server';

export async function GET() {
    return Response.json({ heel: 'rere' });
}

export async function POST(req: Request, res: any) {
    const formData = await req.formData();

    const file = formData.get('file');
    if (!file) {
        return NextResponse.json(
            { error: 'No files received.' },
            { status: 400 },
        );
    }

    //@ts-ignore
    const buffer = Buffer.from(await file.arrayBuffer());
    const zip = new AdmZip(buffer);
    // const filename = file.name.replaceAll(' ', '_');

    try {
        zip.extractAllTo('public/assets/');
        // await writeFile(
        //     path.join(process.cwd(), 'public/assets/' + filename),
        //     buffer,
        // );
        return NextResponse.json({ Message: 'Success', status: 201 });
    } catch (error: any) {
        console.log('Error occured ', error);
        return NextResponse.json({ Message: 'Failed', status: 500 });
    }
}
