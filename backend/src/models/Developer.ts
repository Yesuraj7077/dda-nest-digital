import mongoose, { Schema, model, InferSchemaType } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const DeveloperSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  skills: [String],
  experience: Number,
  location: String,
  userId: { type: String, required: true }, // Auth0 user ID
}, { timestamps: true });

DeveloperSchema.plugin(paginate);

export type Developer = InferSchemaType<typeof DeveloperSchema>;
export default model<Developer, mongoose.PaginateModel<Developer>>('developer_profile', DeveloperSchema);
