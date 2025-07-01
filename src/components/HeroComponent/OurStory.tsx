import Image from "next/image"
import { Users, Handshake } from "lucide-react"

export default function OurStory() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left side - Image with overlay */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/images/Building.jpg"
              alt="Modern city skyline with skyscrapers"
              width={500}
              height={600}
              className="w-full h-[500px] lg:h-[600px] object-cover"
            />

            {/* Decorative dots */}
            <div className="absolute top-8 left-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="absolute top-12 left-1/3 w-4 h-4 border-2 border-red-500 rounded-full"></div>

            {/* Experience overlay */}
            <div className="absolute bottom-8 right-8 bg-white rounded-lg p-6 shadow-lg">
              <div className="text-4xl lg:text-5xl font-bold text-red-500 mb-1">
                30<span className="text-3xl">+</span>
              </div>
              <div className="text-gray-600 text-sm">
                Years of
                <br />
                Experience
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="text-red-500 text-sm font-medium tracking-wider">// DISCOVER OUR STORY</div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              Unveiling StayZy Real Estate Journey
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.
              Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6">
            {/* Client Centric Approach */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-red-50 rounded-full flex items-center justify-center border-2 border-red-100">
                <Users className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    01
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Client Centric Approach</h3>
                </div>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.
                </p>
              </div>
            </div>

            {/* Integrity & Transparency */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-red-50 rounded-full flex items-center justify-center border-2 border-red-100">
                <Handshake className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    02
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Integrity & Transparency</h3>
                </div>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-base font-medium"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
