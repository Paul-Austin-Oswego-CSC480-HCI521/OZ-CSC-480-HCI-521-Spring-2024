FROM openjdk:17-jdk-slim as build

COPY pom.xml /
COPY mvnw /
COPY .mvn/ .mvn/

COPY src/ /src/
# RUN ./mvnw package

# build maven project and cache it; this is slow for first build,
# as maven dependencies must be downloaded, but is
# MASSIVELY faster for subsequent builds (40s vs 3s)
RUN --mount=type=cache,target=/root/.m2,rw ./mvnw -B package

FROM icr.io/appcafe/open-liberty:kernel-slim-java17-openj9-ubi

COPY --chown=1001:0 /src/main/liberty/config /config

# this is still slow ;) but only runs if changes were made to liberty configuration
RUN features.sh

COPY --chown=1001:0 --from=build target/*.war /config/apps

# COPY --chown=1001:0 target/*.war /config/apps

# ARG is set when building, not when running
ARG OPENJ9_SCC=${OPENJ9_SCC:-true}

# RUN echo "OPENJ9_SCC = ${OPENJ9_SCC}"

# this is still slow as well;) but only runs if changes were made
# to liberty configuration or src
RUN configure.sh
