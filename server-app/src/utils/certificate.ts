/**
 * Author: Parth Mehta
 * Banner ID: B00931931
 */
import path from "path";
import PDFDocument from 'pdfkit';
import User from '../models/User';
import Event from '../models/Event';
import { Request, Response } from 'express';

export const generateAndDownloadCertificate = async (req: Request, res: Response) => {
    const { userId, eventId } = req.params;

    try {
        const user = await User.findById(userId);
        const event = await Event.findById(eventId);

        if (!user || !event) {
            return res.status(404).send("User or event not found.");
        }

        const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="certificate-${userId}-${eventId}.pdf"`);

        doc.pipe(res);
        doc.rect(50, 50, doc.page.width - 100, doc.page.height - 100).stroke();

        doc.opacity(1);

        doc.font('Helvetica-Bold')
            .fontSize(40)
            .fillColor('black')
            .text('CERTIFICATE OF COMPLETION', 0, 100, { align: 'center', width: doc.page.width });

        doc.moveTo(100, 150)
            .lineTo(doc.page.width - 100, 150)
            .lineWidth(2)
            .stroke();

        doc.font('Helvetica-Oblique')
            .fontSize(14)
            .fillColor('#444444')
            .text(`This is to certify that`, 0, 210, { align: 'center', width: doc.page.width })
            .moveDown(0.5)

        doc.font('Times-Roman')
            .fontSize(35)
            .fillColor('black')
            .text(`${user.firstName} ${user.lastName}`, 0, 245, { align: 'center', width: doc.page.width })
            .moveDown(0.5)

        doc.font('Helvetica-Oblique')
            .fontSize(14)
            .fillColor('#444444')
            .text(`Has successfully participated in`, 0, 300, { align: 'center', width: doc.page.width })
            .moveDown(0.5)

        doc.font('Times-Roman')
            .fontSize(24)
            .fillColor('black')
            .text(`${event.eventName}`, 0, 340, { align: 'center', width: doc.page.width })
            .moveDown(0.5)

        doc.font('Helvetica-Oblique')
            .fontSize(18)
            .fillColor('#444444')
            .text(`held on ${event.eventStartDateTime.toDateString()}.`, 0, 390, { align: 'center', width: doc.page.width })
            .moveDown(0.5)

        const image_path = path.join(__dirname, "signature.png")
        doc.image(image_path, doc.page.width - 185, doc.page.height - 150, { align: 'center', width: 100 });

        doc.moveTo(doc.page.width - 90, doc.page.height - 100)
            .lineTo(doc.page.width - 185, doc.page.height - 100)
            .stroke();

        doc.fontSize(14)
            .text('Signature', doc.page.width - 200, doc.page.height - 90, { align: 'center' });

        doc.end();

    } catch (error) {
        res.status(500).send("An error occurred while generating the certificate.");
    }
};
