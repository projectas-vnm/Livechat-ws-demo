export class BaseDto {
    _id: string;

    // Thời gian tạo
    createdAt: Date;

    // Người tạo
    createdBy: string;

    // Thời gian cập nhật
    updatedAt: Date;

    // Người cập nhật
    updatedBy: string;

    // Thời gian xóa
    deletedAt?: Date;

    // Người xóa
    deletedBy?: string;
}
